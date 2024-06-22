import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environment";


@Injectable({
    providedIn:'root'
})
export class VoteService{


    private vote = `${environment.localhost}Voters/vote?candidateId=`

    constructor(private _http:HttpClient){}

    Vote(id:number){
        return this._http.post<any>(this.vote+id,{})
    }
}