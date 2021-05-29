import { Component, OnInit } from '@angular/core';
import { NavparamService } from '../navparam.service';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Carmodel {
  brand: string;
  model: string;
  startyear: number;
  endyear: number;
}

interface Year {
  isChecked: boolean;
  year: number;

}

interface ProgrammingDetails {
  brand: string;
  model: string;
  years: Array<number>;
  blade: string;
  chip: string;
  smartProYes: number;
  smartProNo: number;
  autelYes: number;
  autelNo: number;
  xtoolYes: number;
  xtoolNo: number;
  obdStarYes: number;
  obdStarNo: number;
  kdRemotesYes: number;
  kdRemotesNo: number;
  xHorseYes: number;
  xHorseNo: number;
  notes: Array<string>;
}

@Component({
  selector: 'app-addprogrammingdetails',
  templateUrl: './addprogrammingdetails.page.html',
  styleUrls: ['./addprogrammingdetails.page.scss'],
})
export class AddprogrammingdetailsPage implements OnInit {

  public selectedmodel: Carmodel;
  public years: Array<Year> = [];

  public errorList = [];

  constructor(private navParamService: NavparamService, private http: HttpClient) {

    this.selectedmodel = this.navParamService.getNavData();

    for (let i = this.selectedmodel.startyear; i <= this.selectedmodel.endyear; i++) {
      let currentYear = { isChecked: true, year: i }
      this.years.push(currentYear);
    }


  }

  _getSelectedYear(selectedyear) {

    this.years.forEach(year => {
      if (year.year == selectedyear.year) {
        year.isChecked = !selectedyear.isChecked
      }
    });
  }

  onSubmit(form: NgForm) {
    let selectedyears: Array<number> = [];
    let notes: Array<string> = [];

    this.errorList = [];

    this.years.forEach(year => {
      if (year.isChecked == true) {
        selectedyears.push(year.year);
      }
    });

    if (form.value.chip == "" || form.value.blade == "" || selectedyears.length == 0) {
      this.errorList.push('some fields are empty');
    }
    else {
      let saveProgrammingData: ProgrammingDetails = {
        brand: this.selectedmodel.brand, model: this.selectedmodel.model,
        years: selectedyears, blade: form.value.blade, chip: form.value.chip, smartProYes: 0, smartProNo: 0, autelYes: 0,
        autelNo: 0, xtoolYes: 0, xtoolNo: 0, obdStarYes: 0, obdStarNo: 0, kdRemotesYes: 0, kdRemotesNo: 0, xHorseYes: 0, xHorseNo: 0, notes: notes
      };

      return this.http.post('https://tapsystock-a6450-default-rtdb.firebaseio.com/programming-details.json', saveProgrammingData).subscribe(
        resData => {
        }
      );

    }
  }



  ngOnInit() {
  }

}
