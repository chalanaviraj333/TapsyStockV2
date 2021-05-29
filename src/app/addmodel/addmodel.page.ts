import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


interface Brand {
  name: string;
  icon: string;
}

@Component({
  selector: 'app-addmodel',
  templateUrl: './addmodel.page.html',
  styleUrls: ['./addmodel.page.scss'],
})
export class AddmodelPage implements OnInit {

  public brands = [];
  public errorList = [];

  constructor(private http: HttpClient) {

    this.http.get<{ [key: string]: Brand }>('https://tapsystock-a6450-default-rtdb.firebaseio.com/car-brand.json')
      .subscribe(resData => {
        for (const key in resData) {
          this.brands.push(resData[key].name)
          this.brands.sort((a, b) => (a > b) ? 1 : -1)
        }
      }
      );
  }

  onSubmit(form: NgForm) {

    this.errorList = [];

    if (form.value.carbrand == "" || form.value.carmodel == "" || form.value.startyear == "" || form.value.endyear == "") {
      this.errorList.push('some fields are empty');

    }
    else {
      const iconname = form.value.carbrand.replace(/\s/g, "") + form.value.carmodel.replace(/\s/g, "") + '.png';

      return this.http.post('https://tapsystock-a6450-default-rtdb.firebaseio.com/car-model.json', { brand: form.value.carbrand, model: form.value.carmodel, startyear: form.value.startyear, endyear: form.value.endyear, icon: iconname }).subscribe(
        resData => {
        }
      );

    }


  }

  ngOnInit() {
  }

}
