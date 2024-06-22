
export interface Candidate{
    id:number,
    name:string,
    email:string,
    gender:string,
    personalImage:File|null,
    nationalIdImage:File|null,
    personalImageUrl:string|null,
    nationalIdImageUrl:string|null 
}