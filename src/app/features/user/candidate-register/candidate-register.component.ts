import { Component, OnInit,Signal, signal } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CandidateRegister } from '../../../core/model/request/candidate-register.model';
import { AuthService } from '../../../core/services/authentcation.service';
import { RegisterRequest } from '../../../core/model/request/register.model';
import { Category, SubCategory, getCategoriesResponse } from '../../../shared/model/category.model';
import { CategoryService } from '../../../shared/service/Categories.service';
import { log } from 'console';

@Component({
  selector: 'app-candidate-register',
  templateUrl: './candidate-register.component.html',
  styleUrl: './candidate-register.component.css'
})
export class CandidateRegisterComponent implements OnInit{

  registerForm!: FormGroup;
  nationalIdImage: Blob | null = null;
  personalImage: Blob | null = null;
  gender!:string;

  request:CandidateRegister  = {Name:'',email:'',password:'',Gender:'',PersonalImage:null,NationalIdImage:null};
  categories:getCategoriesResponse[] = [];

  politicalParties = signal<any>([]);
  issueBase= signal<any>([]);


  constructor(private fb: FormBuilder,
              private router: Router,
              private authServ: AuthService,
              private categoryServ:CategoryService) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      nationalidimage: [null, Validators.required],
      personalimage: [null, Validators.required],
      gender:['',Validators.required]
    });
  }

  ngOnInit(): void {
    
    this.categoryServ.GetCategories().subscribe(data=>{
      console.log(data[0].subcategories);
      this.categories = data

      this.politicalParties.set(data[0].subcategories);
      this.issueBase.set(data[3].subcategories)
    })
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Candidate Registration successful', this.registerForm.value);
      // Here you can also send the form data to your backend server
       this.request = {
        Name: this.registerForm.value.name,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        NationalIdImage: this.nationalIdImage,
        PersonalImage: this.personalImage,
        Gender:this.registerForm.value.gender
      };
      const formData = this.authServ.objectToFormData(this.request)
      // Send the formData to the backend
      this.authServ.CandidateReegister(formData).subscribe(data=>{
        console.log(data);
        this.router.navigate(['select-party'])
      })
    } else {
      console.log('Form is not valid');
    }
  }

  onNationalIdImageSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0] as File;
      this.convertToBlob(file, 'nationalidimage');
    }
  }

  onPersonalImageSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0] as File;
      this.convertToBlob(file, 'personalimage');
    }
  }

  genderSelected()
  {

  }

  convertToBlob(file: File, controlName: string) {
    const reader = new FileReader();
    reader.onload = () => {
      const binaryString = reader.result as string;
      if (controlName === 'nationalidimage') {
        this.nationalIdImage = this.dataURItoBlob(binaryString);
      } else if (controlName === 'personalimage') {
        this.personalImage = this.dataURItoBlob(binaryString);
      }
    };
    reader.readAsDataURL(file);
  }

  dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }






  goBack() {
    this.router.navigate(['']); // Navigate back to the main page
  }
}


