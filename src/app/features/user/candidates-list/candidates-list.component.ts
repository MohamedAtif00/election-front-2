import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../../../shared/service/candidate.service';
import { Candidate } from '../../../shared/model/candidate.model';
import { catchError, of } from 'rxjs';
import { error } from 'console';
import { VoteService } from '../../../shared/service/vote.service';
import { privateDecrypt } from 'crypto';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-candidates-list',
  templateUrl: './candidates-list.component.html',
  styleUrl: './candidates-list.component.css'
})
export class CandidatesListComponent implements OnInit{

  candidates!:Candidate[] ;
  constructor(private candidateServ:CandidateService,
              private voteServ:VoteService,
              private router:Router,
              private toastr:ToastrService){}

  ngOnInit(): void {

    // Get Candidate
    this.LoadCandidates()
    ////////////


  }
  

  LoadCandidates()
  {
    if(this.candidateServ.ids.length != 0)
      {
        this.candidateServ.GetCandidates(this.candidateServ.ids).subscribe(data=>{
          if(data)
          this.candidates = data
          console.log(this.candidates);
          this.candidates.forEach(e =>{
            this.loadImage(e.id,true,url => e.personalImageUrl = url)
            })
          this.candidateServ.ids = []
    
        },error =>{
          console.log(error);
          
        })

      }else
      {
          this.candidateServ.GetAllCandidates().subscribe(data=>{
            console.log(data);
            if(data)
              this.candidates = data
              console.log(this.candidates);
              this.candidates.forEach(e =>{
                this.loadImage(e.id,true,url => e.personalImageUrl = url)
                })
          },error=>{

          })
      }
  }


  loadImage(candidateId: number, persone: boolean, callback: (url: string) => void): void {
    this.candidateServ.GetCandidateImgae(candidateId, persone).subscribe(
      (data: any) => {
      
        const reader = new FileReader();
        reader.onloadend = () => {
          callback(reader.result as string);
        };
        reader.readAsDataURL(data);
      },
      error=>{
        console.log(error);
        
      });
  }

  vote(cand:Candidate)
  {
    this.voteServ.Vote(cand.id).subscribe(data=>{
        this.router.navigate(['camera'])
    },error=>{
      console.log(error.error);
      this.toastr.error(error.error,'Error')
      this.router.navigate([''])
    })
  }


}
