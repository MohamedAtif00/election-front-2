import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, catchError, map, throwError } from "rxjs";
import { IAuthInfo } from "../model/user.model";
import { RegisterRequest } from "../model/request/register.model";
import { environment } from "../../../environment";
import { LoginRequest } from "../model/request/login.model";
import { Router } from "@angular/router";
import { CandidateRegister } from "../model/request/candidate-register.model";



@Injectable({
    providedIn:'root'
})
export class AuthService {

  //register
  private postRegister:string =`${environment.localhost}Auth/register/voter`
  private postCandidateRegister:string =`${environment.localhost}Auth/register/candidate`
  private postAdminRegister:string = `${environment.localhost}Account/AdminRegister`
  private postLogin:string =`${environment.localhost}Auth/login/voter `
  private postCompanyLogin:string =`${environment.localhost}Auth/login/candidate`
  private postLoginAdmin:string = `${environment.localhost}Account/AdminLogin`


  private stateItem: BehaviorSubject<IAuthInfo | null> = new BehaviorSubject<IAuthInfo | null>(this.getAuthInfoFromStorage());
  stateItem$: Observable<IAuthInfo | null> = this.stateItem.asObservable();

  constructor(private _http: HttpClient,private router:Router) {
    console.log(this.isAdmin());
    if(this.getAuthInfoFromStorage())
      this.stateItem.next(this.getAuthInfoFromStorage());

    console.log(this.stateItem.value?.role);
    
  }

  login(request:LoginRequest): Observable<IAuthInfo> {
    return this._http.post<IAuthInfo>(this.postLogin,request ).pipe(
      map((response: IAuthInfo) => {
        this.setAuthInfoToStorage(response);
        this.stateItem.next(response);
        return response;
      }),
      catchError(this.handleError)
    );
  }

  CandidateLogin(request:LoginRequest) : Observable<IAuthInfo>
  {
    return this._http.post<IAuthInfo>(this.postCompanyLogin,request ).pipe(
      map((response: IAuthInfo) => {
        this.setAuthInfoToStorage(response);
        this.stateItem.next(response);
        this.stateItem$ = this.stateItem.asObservable();
        return response;
      }),
      catchError(this.handleError)
    );
  }

  AdminLogin(request:LoginRequest)
  {
    return this._http.post<IAuthInfo>(this.postLoginAdmin,request ).pipe(
      map((response: IAuthInfo) => {
        response.role = 'admin';
        this.setAuthInfoToStorage(response);
        this.stateItem.next(response);
        return response;
      }),
      catchError(this.handleError)
    );
  }

  register(request:FormData)
  {
    return this._http.post<IAuthInfo>(this.postRegister,request).pipe(
      map(
        (response)=>{
          console.log('From Authentication Service',response);
          this.setAuthInfoToStorage(response);
          this.stateItem.next(response);
          return response;
        }
      )
    )
  }

  CandidateReegister(request:FormData)
  {
    return this._http.post<IAuthInfo>(this.postCandidateRegister,request).pipe(
      map((response: IAuthInfo) => {
        this.setAuthInfoToStorage(response);
        this.stateItem.next(response);
        return response;
      }),
      catchError(this.handleError)
    );
  }

  // AdminRegister(request:AdminRegister)
  // {
  //   return this._http.post<IAuthInfo>(this.postAdminRegister,request).pipe(
  //     map(
  //       (response)=>{
  //         response.role= 'admin';
  //         console.log('From Authentication Service',response);
  //         this.setAuthInfoToStorage(response);
  //         this.stateItem.next(response);
  //         return response;
  //       }
  //     )
  //   )
  // }


  logout(): void {
    this.clearAuthInfoFromStorage();
    this.stateItem.next(null);
    this.router.navigate(['']);
  }

  isAuthenticated(): boolean {
    return !!this.stateItem.value;
  }

  isAdmin()
  {
    return this.stateItem.value?.role  == 'admin'
  }

  isVoter()
  {
    return this.stateItem.value?.role.toLowerCase() == 'voter'
  }

  GetId()
  {
    
  }

  getAuthToken(): string | null {
    return this.stateItem.value ? this.stateItem.value.token : null;
  }

  private setAuthInfoToStorage(authInfo: IAuthInfo): void {
      localStorage.removeItem('authInfo');
      localStorage.setItem('authInfo', JSON.stringify(authInfo));

  }

  private getAuthInfoFromStorage(): IAuthInfo | null {
    if (typeof localStorage !== 'undefined') {
      const authInfo = localStorage.getItem('authInfo');
      return authInfo ? JSON.parse(authInfo) : null;
    }else
    {
      return null
    }
  }

  private clearAuthInfoFromStorage(): void {
    localStorage.removeItem('authInfo');
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }


  /////////////////////////

 // Method to convert object to FormData
 objectToFormData(obj: any): FormData {
  const formData = new FormData();
    for (const key of Object.keys(obj)) {
      formData.append(key, obj[key]);
    }
    return formData;
}

  
}