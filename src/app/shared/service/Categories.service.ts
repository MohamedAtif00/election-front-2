import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environment";
import { Category, SubCategory, getCategoriesResponse } from "../model/category.model";
import { AuthService } from "../../core/services/authentcation.service";
import { IAuthInfo } from "../../core/model/user.model";


@Injectable({
 providedIn:'root'
})
export class CategoryService{

    private getAllCategories = `${environment.localhost}Categories`
    private getParties = `${environment.localhost}Subcategories/political-parties`
    private getIssueBased = `${environment.localhost}Subcategories/issue-based-groups`


    // set
    private postParty = `${environment.localhost}Candidates/`



    user!:IAuthInfo ; 
    constructor(private _http:HttpClient,private authServ:AuthService){
        authServ.stateItem$.subscribe(data=>{
            if(data)
            this.user = data;
        })
    }

    GetCategories()
    {
        return this._http.get<getCategoriesResponse[]>(this.getAllCategories);
    }


    GetParties()
    {
        return this._http.get<{id:string,name:string}[]>(this.getParties);
    }

    GetIssuedBased()
    {
        return this._http.get<{id:string,name:string}[]>(this.getIssueBased)
    }





    // Set for Candidate
    SetParty(id:number)
    {
        return this._http.post<any>(this.postParty+this.user.id+'/add-subcategory/political-parties/'+id,{})
    }





}