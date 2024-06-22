import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { VoterRegisterComponent } from './voter-register/voter-register.component';
import { CandidateRegisterComponent } from './candidate-register/candidate-register.component';
import { SelectPartyComponent } from './select-party/select-party.component';
import { SelectIssueComponent } from './select-issue/select-issue.component';
import { CandidatesListComponent } from './candidates-list/candidates-list.component';
import { CameraPageComponent } from './camera-page/camera-page.component';

const routes: Routes = [
  {path:'',component:UserComponent},
  {path:'voter-register',component:VoterRegisterComponent},
  {path:'candidate-register',component:CandidateRegisterComponent},
  {path:'select-party',component:SelectPartyComponent},
  {path:'select-issue',component:SelectIssueComponent},
  {path:'candidates',component:CandidatesListComponent},
  {path:'camera',component:CameraPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
