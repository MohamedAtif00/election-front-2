import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/authentcation.service';
import { CandidateService } from '../../shared/service/candidate.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{


  constructor(public authServ:AuthService,private candidataServ:CandidateService){}

  ngOnInit(): void {
    this.candidataServ.GetAllCandidates().subscribe(data=>{
      console.log(data);
      
    })
  }
}
