import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

constructor() { }

API_PATH = 'https://fifunnyapi20220324132933.azurewebsites.net/api/';//'https://localhost:44383/api/'; //

getApiPath(): string{
  return this.API_PATH;
}

}
