import { Injectable } from '@angular/core';
import axios from 'axios';
import { api } from '../api';
import { Category } from '../types';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  defUrl:string='/api/categories';

  constructor() { }


  getAllCategories():Category[] {
    let categories:Category[]=[];
    axios.get(api.url+this.defUrl).then(function(response){
        for(let d of response.data)
        categories.push(d);
    });
    return categories;
  }

  getCategoryById(categoryId:number):Category{
    let category:any;
    axios.get(api.url+this.defUrl+`/getCategoryByID/${categoryId}`).then(function(response){category=response.data});
    return category;
  }

  getCategoryNames():string[]{
    let names:string[]=[];
    axios.get(api.url+this.defUrl+`/names`).then(function(response){names=response.data});
    return names;
  }

  createCategory(category:Category):void{
    axios.post(api.url+this.defUrl+`/insertCategory`,category).then(function(response){console.log("Category created successfully")});

  }
  
  updateCategory(category:Category):void{
    axios.put(api.url+this.defUrl+`/updateCategory/${category.id}`,category).then(function(response){console.log("Category updated successfully")});
  }

  deleteCategory(category:Category):void{
    axios.delete(api.url+this.defUrl+`/deleteCategory/${category.id}`).then(function(response){console.log(response.data)});
  }
}
