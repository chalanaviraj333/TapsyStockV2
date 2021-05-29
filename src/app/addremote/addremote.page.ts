import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


interface Remote {
  tapsycode: string;
  boxnumber: number;
  inbuildchip: string;
  inbuildblade: string;
  remotetype: string;
  compitablebrands: Array<string>;
  image: string;
  notes: string;
  compitablecars: Array<Object>;
}

interface Model {
  brand: string;
  model: string;
  icon: string;
  startyear: number;
  endyear: number;
}

@Component({
  selector: 'app-addremote',
  templateUrl: './addremote.page.html',
  styleUrls: ['./addremote.page.scss'],
})
export class AddremotePage implements OnInit {

  public carbrands = [];
  public allcars: Model[] = [];
  public selectedcarbrandmodels = [];
  public selectedcarmodelyears: Array<number>;
  public addedcars: Model[] = [];

  public boxNumber: number;
  public tapsyCode: string;
  public inbuildChip: string;
  public inbuildBlade: string;
  public remoteType: string;
  public noTes: string;
  public compitableBrandsunsorted = [];
  public compitableBrands: Array<string>;

  public errorList = [];

  constructor(private http: HttpClient) {

    let allcarbrandswithduplicates = [];


    this.http.get<{ [key: string]: Model }>('https://tapsystock-a6450-default-rtdb.firebaseio.com/car-model.json')
      .subscribe(resData => {
        for (const key in resData) {
          allcarbrandswithduplicates.push(resData[key].brand);
          this.allcars.push(resData[key]);
        }
        this.carbrands = allcarbrandswithduplicates.filter(function (elem, index, self) {
          return index === self.indexOf(elem);
        });

      });

  }

  ngOnInit() {
  }

  onChangeBrand(selectedcarbrand) {
    this.selectedcarbrandmodels = [];
    this.allcars.forEach(car => {
      if (car.brand == selectedcarbrand.target.value) {
        this.selectedcarbrandmodels.push(car.model);
      }
    });
  }

  onChangeCarModel(selectedcarmodel){
    let selectedmodel: Model;
    this.selectedcarbrandmodels.forEach(car => {
      if (car.model == selectedcarmodel.target.value) {
        selectedmodel = car;
      }
    });
    for (let i = selectedmodel.startyear; i <= selectedmodel.endyear; i++) {
      this.selectedcarmodelyears.push(i);
    }

  }


  onSubmit(form: NgForm) {
    this.errorList = [];

    if (form.value.brand == "" || form.value.model == "" || form.value.startyear == "" || form.value.endyear == "") {
      this.errorList.push('add this car fields should not be empty!');

    }
    else {
      this.addedcars.push(form.value);
      this.compitableBrandsunsorted.push(form.value.brand);

      this.compitableBrands = this.compitableBrandsunsorted.filter(function (elem, index, self) {
        return index === self.indexOf(elem);
      });

    }
  }

  doneclicked() {

    this.errorList = [];
    if (this.tapsyCode == undefined || this.boxNumber == undefined || this.remoteType == undefined) {
      this.errorList.push('add remotes fields are empty!');
    }
    else {
      const iconname = this.tapsyCode.replace(/\s/g, "") + '.png';

      const newRemote: Remote = {
        tapsycode: this.tapsyCode, boxnumber: this.boxNumber, inbuildchip: this.inbuildChip, inbuildblade: this.inbuildBlade,
        remotetype: this.remoteType, image: iconname, notes: this.noTes, compitablebrands: this.compitableBrands, compitablecars: this.addedcars
      };

      return this.http.post('https://tapsystock-a6450-default-rtdb.firebaseio.com/remotes.json', newRemote).subscribe(
        resData => {
          console.log(resData);
        }
      );

    }

  }

}
