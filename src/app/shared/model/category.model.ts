export interface Category{
    Id:number;
    Name:string;
    SubCategories:SubCategory[];
}

export interface SubCategory{
    Id:number,
    Name:string
}

export interface getCategoriesResponse{
    id:number,
    name:string,
    subcategories:SubCategory[]
}