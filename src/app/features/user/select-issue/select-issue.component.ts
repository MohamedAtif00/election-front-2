import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SubCategory } from '../../../shared/model/category.model';
import { CategoryService } from '../../../shared/service/Categories.service';
import { Router } from '@angular/router';
import { error } from 'console';
import { AuthService } from '../../../core/services/authentcation.service';
import { CandidateService } from '../../../shared/service/candidate.service';

@Component({
  selector: 'app-select-issue',
  templateUrl: './select-issue.component.html',
  styleUrl: './select-issue.component.css'
})
export class SelectIssueComponent {


  @Output() selectionChange = new EventEmitter<{ politicalParty: number, subCategories: number[] }>();
  
  politicalPartyForm!: FormGroup;
  categories: any[] = [];
  politicalParties = signal<{id:string,name:string}[]>([]);
  subcategories = signal<SubCategory[]>([]);

  constructor(private fb: FormBuilder, 
              private categoryServ: CategoryService,
              private router:Router,
              private authServ:AuthService,
              private candidateServ:CandidateService) {}

  ngOnInit(): void {
    this.politicalPartyForm = this.fb.group({
      politicalParty: ['', Validators.required],
      subCategories: [[], Validators.required]
    });

    this.categoryServ.GetIssuedBased().subscribe(data => {
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
          this.router.navigate([''])
        },error=>{
          console.log(error);
          this.router.navigate([''])
        })

      }else
      {
        this.candidateServ.ids.push(selectedPartyId)
        this.router.navigate(['candidates'])
      }
  }



}
