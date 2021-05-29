import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-additems',
  templateUrl: './additems.page.html',
  styleUrls: ['./additems.page.scss'],
})
export class AdditemsPage implements OnInit {

  constructor(private router: Router) { }

  addCarBrand() {
    this.router.navigateByUrl('addcarbrand');
  }

  addCarModel() {
    this.router.navigateByUrl('addmodel');
  }

  addNewRemote() {
    this.router.navigateByUrl('addremote');
  }

  addProgDetails() {
    this.router.navigateByUrl('programmingdetails');
  }

  editCarModel() {
    this.router.navigateByUrl('editcarmodel');
  }

  editRemote() {
    this.router.navigateByUrl('editremote');
  }

  editCarDetails() {
    this.router.navigateByUrl('editcardetails');
  }

  ngOnInit() {
  }

}
