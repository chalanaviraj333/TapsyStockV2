import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-addcarbrand',
  templateUrl: './addcarbrand.page.html',
  styleUrls: ['./addcarbrand.page.scss'],
})
export class AddcarbrandPage implements OnInit {

  public errorList = [];

  constructor(private http: HttpClient) { }


  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.errorList = [];

    if (form.value.carbrand == "" || form.value.iconname == "") {
      this.errorList.push('some fields are empty');

    }
    else {
      return this.http.post('https://tapsystock-a6450-default-rtdb.firebaseio.com/car-brand.json', { name: form.value.carbrand, icon: form.value.iconname }).subscribe(
        resData => {
        }
      );

    }
  }

}
