import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SubCategory } from '../../../shared/model/category.model';
import { CategoryService } from '../../../shared/service/Categories.service';
import { Router } from '@angular/router';
import { error } from 'console';
import { AuthService } from '../../../core/services/authentcation.service';
import { CandidateService } from '../../../shared/service/candidate.service';

@Component({
  selector: 'app-select-party',
  templateUrl: './select-party.component.html',
  styleUrl: './select-party.component.css'
})
export class SelectPartyComponent {


  @Output() selectionChange = new EventEmitter<{ politicalParty: number, subCategories: number[] }>();
  
  politicalPartyForm!: FormGroup;
  categories: any[] = [];
  politicalParties = signal<{id:string,name:string}[]>([]);
  subcategories = signal<SubCategory[]>([]);

  constructor(private fb: FormBuilder, 
              private categoryServ: CategoryService,
              private router:Router,
              private authServ:AuthService,
              private caindidateServ:CandidateService) {}

  ngOnInit(): void {
    this.politicalPartyForm = this.fb.group({
      politicalParty: ['', Validators.required],
      subCategories: [[], Validators.required]
    });

    this.categoryServ.GetParties().subscribe(data => {
      console.log('parties',data);
      this.politicalParties.set(data)
      
    });

    this.politicalPartyForm.valueChanges.subscribe(value => {
      this.selectionChange.emit(value);
    });
  }

  onPoliticalPartSelect(event: Event) {
    const selectedPartyId = parseInt((event.target as HTMLSelectElement).value);
    console.log(`Selected Political Party: ${selectedPartyId}`);
    if(!this.authServ.isVoter())
      {
        this.categoryServ.SetParty(selectedPartyId).subscribe(data=>{
          console.log(data);
          this.router.navigate(['select-issue'])
        },error =>{
          console.log(error);
          this.router.navigate(['select-issue'])
        })
      }else{
        this.caindidateServ.ids = []
        this.caindidateServ.ids.push(selectedPartyId)
        this.router.navigate(['select-issue'])
      }
        
  }

  // onSubcategorySelect(event: Event) {
  //   const options = (event.target as HTMLSelectElement).options;
  //   const selectedSubCategories = [];
  //   for (let i = 0; i < options.length; i++) {
  //     if (options[i].selected) {
  //       selectedSubCategories.push(parseInt(options[i].value, 10));
  //     }
  //   }
  //   this.politicalPartyForm.get('subCategories')?.setValue(selectedSubCategories);
  // }


} 
