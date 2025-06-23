import { resolve } from 'node:path';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../types';
import axios from 'axios';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  defUrl:string="/api/users";
  constructor() { }

  getByUserName(username:string):User{
    let user:any;
    axios.get(environment.apiUrl+this.defUrl+`/byUsername?username=${username}`).then(function(response){
      user=response.data;
      console.log(user);
    });
    return user;
  }
}
