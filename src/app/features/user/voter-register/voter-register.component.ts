import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/authentcation.service';
import { RegisterRequest } from '../../../core/model/request/register.model';
import { log } from 'console';

@Component({
  selector: 'app-voter-register',
  templateUrl: './voter-register.component.html',
  styleUrl: './voter-register.component.css'
})
export class VoterRegisterComponent {

  registerForm!: FormGroup;
  nationalIdImage: Blob | null = null;

  constructor(private fb: FormBuilder,
              private router: Router,
              private authServ: AuthService) {
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      nationalidimage: [null, Validators.required] // Initialize the nationalidimage control
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Registration successful', this.registerForm.value);
      // Here you can also send the form data to your backend server
      let request: RegisterRequest = {
        Name: this.registerForm.value.name,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        NationalIdImage: this.nationalIdImage // Assign the selected image to the request
      };
      const formData = this.authServ.objectToFormData(request);

      this.authServ.register(formData).subscribe(data=>{
        console.log(data);
        this.router.navigate([''])
      })
    } else {
      console.log('Form is not valid');
    }
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0] as File;
      this.convertToBlob(file);
    }
  }

  convertToBlob(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      const binaryString = reader.result as string;
      this.nationalIdImage = this.dataURItoBlob(binaryString);
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
    this.router.navigate(['']);
  }


}
