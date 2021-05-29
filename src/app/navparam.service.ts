import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavparamService {

  brand:any;

  constructor() { }

setNavData(navObj){
  this.brand = navObj

}

getNavData(){
  return this.brand;

}

}
