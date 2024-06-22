import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { VoterRegisterComponent } from './voter-register/voter-register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CandidateRegisterComponent } from './candidate-register/candidate-register.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SelectPartyComponent } from './select-party/select-party.component';
import { SelectIssueComponent } from './select-issue/select-issue.component';
import { CandidatesListComponent } from './candidates-list/candidates-list.component';
import { CameraPageComponent } from './camera-page/camera-page.component';
import { WebcamModule } from 'ngx-webcam';
import { AuthInterceptor } from '../../core/interceptor/auth.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { CandidateBarChartComponent } from './candidate-bar-chart/candidate-bar-chart.component';
import { ChartModule } from 'primeng/chart';

@NgModule({
  declarations: [
    UserComponent,
    VoterRegisterComponent,
    CandidateRegisterComponent,
    SelectPartyComponent,
    SelectIssueComponent,
    CandidatesListComponent,
    CameraPageComponent,
    CandidateBarChartComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    WebcamModule,
    ChartModule,
    ToastrModule.forRoot()

  ],providers:
  [
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}
  ]
})
export class UserModule { }
