import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-camera-page',
  templateUrl: './camera-page.component.html',
  styleUrl: './camera-page.component.css'
})
export class CameraPageComponent {

  permissionStatus: string = '';
  camData: any = null;
  capturedImage: any;
  trigger: Subject<void> = new Subject<void>();


  constructor(private router:Router,private toastr:ToastrService){}

  get $trigger(): Observable<void> {
    return this.trigger.asObservable();
  }

  checkPermission() {
    navigator.mediaDevices.getUserMedia({ video: { width: 500, height: 500 } }).then((response) => {
      this.permissionStatus = 'Allowed';
      this.camData = response;
      console.log(this.camData);
    }).catch(err => {
      this.permissionStatus = 'Not Allowed';
      console.log(this.permissionStatus);
    });
  }

  capture(event: WebcamImage) {
    // console.log("clicked");
    console.log("event", event); // img details
    this.capturedImage = event.imageAsDataUrl;
  }

  captureImage() {
    this.trigger.next();
    this.toastr.success('Voting Completed','success')
    this.router.navigate([''])
  }

}
