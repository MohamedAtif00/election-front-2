import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../core/services/authentcation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {


  voterLoginForm: FormGroup;  
  candidateLoginForm: FormGroup;

  constructor(private modalService: NgbModal, 
              private fb: FormBuilder,public authServ:AuthService) {
    this.voterLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.candidateLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  onSubmitVoter() {
    if (this.voterLoginForm.valid) {
      console.log('Voter Login successful', this.voterLoginForm.value);
      // Handle successful voter login logic here
      this.authServ.login({email:this.voterLoginForm.value.email,password:this.voterLoginForm.value.password}).subscribe(data=>{
        console.log(data);
        
      })
    } else {
      console.log('Form is not valid');
    }
  }

  onSubmitCandidate() {
    if (this.candidateLoginForm.valid) {
      console.log('Candidate Login successful', this.candidateLoginForm.value);
      // Handle successful candidate login logic here
    } else {
      console.log('Form is not valid');
    }
  }


}
