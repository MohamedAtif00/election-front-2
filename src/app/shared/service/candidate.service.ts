import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environment";
import { CandidateRegister } from "../../core/model/request/candidate-register.model";
import { Candidate } from "../model/candidate.model";
import { Observer } from "rxjs";


@Injectable({
    providedIn:'root'
})
export class CandidateService{

    private getCandidates = `${environment.localhost}Candidates/subcategories?`
    private getCandidateImage = `${environment.localhost}Candidates/images/`
    private getAllCandidates = `${environment.localhost}Candidates`

    ids:Array<number> = [];
    constructor(private _http:HttpClient){}

    GetCandidates(subcategories: Array<number>) {   
        console.log(subcategories);
        console.log('ids', this.ids);
        
        let query: string = '';
        this.ids.forEach(e => {
            query += `subCategoryIds=${encodeURIComponent(e)}&`;
        });
        console.log('query', query);
        
        return this._http.get<Candidate[]>(`${this.getCandidates}?${query}`);
    }

    GetAllCandidates()
    {
        return this._http.get<any>(this.getAllCandidates)
    }
    
     headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });


    public GetCandidateImgae(id:number,personal:boolean) 
    {
        if(personal)
            {
                return this._http.get(this.getCandidateImage+`${id}/personal`, {headers:this.headers, responseType: 'blob' })
            }else{
                return this._http.get(this.getCandidateImage+id+'/l',{headers:this.headers,responseType:"blob"}) 
            }
    }

}