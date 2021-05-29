import { Component, OnInit } from '@angular/core';
import { NavparamService } from '../navparam.service';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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
  selector: 'app-carnotes',
  templateUrl: './carnotes.page.html',
  styleUrls: ['./carnotes.page.scss'],
})
export class CarnotesPage implements OnInit {

  public choosecar: any;
  public firebaseKey: string;
  public foundFromDatabase = false;
  public programmingDetails: ProgrammingDetails = { brand: 'N/A', model: 'N/A', years: [], blade: 'N/A', chip: 'N/A', smartProYes: 0, smartProNo: 0, autelYes: 0, autelNo: 0, xtoolYes: 0, xtoolNo: 0, obdStarYes: 0, obdStarNo: 0, kdRemotesYes: 0, kdRemotesNo: 0, xHorseYes: 0, xHorseNo: 0, notes: [] };

  public errorList = [];

  constructor(private navParamService: NavparamService, private http: HttpClient) {

    this.choosecar = this.navParamService.getNavData();

    // getting results of car programming details from database
    this.http.get<{ [key: string]: ProgrammingDetails }>('https://tapsystock-a6450-default-rtdb.firebaseio.com/programming-details.json')
      .subscribe(resData => {
        for (const key in resData) {

          if (this.choosecar.brand == resData[key].brand && this.choosecar.model == resData[key].model && resData[key].years.find(i => i === this.choosecar.year)) {
            this.programmingDetails.brand = resData[key].brand;
            this.programmingDetails.model = resData[key].model;
            this.programmingDetails.years = resData[key].years;
            this.programmingDetails.blade = resData[key].blade;
            this.programmingDetails.chip = resData[key].chip;
            this.programmingDetails.smartProYes = resData[key].smartProYes;
            this.programmingDetails.smartProNo = resData[key].smartProNo;
            this.programmingDetails.autelYes = resData[key].autelYes;
            this.programmingDetails.autelNo = resData[key].autelNo;
            this.programmingDetails.xtoolYes = resData[key].xtoolYes;
            this.programmingDetails.xtoolNo = resData[key].xtoolNo;
            this.programmingDetails.obdStarYes = resData[key].obdStarYes;
            this.programmingDetails.obdStarNo = resData[key].obdStarNo;
            this.programmingDetails.kdRemotesYes = resData[key].kdRemotesYes;
            this.programmingDetails.kdRemotesNo = resData[key].kdRemotesNo;
            this.programmingDetails.xHorseYes = resData[key].xHorseYes;
            this.programmingDetails.xHorseNo = resData[key].xHorseNo;
            this.programmingDetails.notes = resData[key].notes || [];

            this.firebaseKey = key;
            this.foundFromDatabase = true;
          }
          else {

          }
        }

        if (this.foundFromDatabase == false) {
          this.programmingDetails.brand = this.choosecar.brand;
          this.programmingDetails.model = this.choosecar.model;
          this.programmingDetails.years = [this.choosecar.year];
          this.programmingDetails.blade = 'N/A';
          this.programmingDetails.chip = 'N/A';
          this.programmingDetails.smartProYes = 0;
          this.programmingDetails.smartProNo = 0;
          this.programmingDetails.autelYes = 0;
          this.programmingDetails.autelNo = 0;
          this.programmingDetails.xtoolYes = 0;
          this.programmingDetails.xtoolNo = 0;
          this.programmingDetails.obdStarYes = 0;
          this.programmingDetails.obdStarNo = 0;
          this.programmingDetails.kdRemotesYes = 0;
          this.programmingDetails.kdRemotesNo = 0;
          this.programmingDetails.xHorseYes = 0;
          this.programmingDetails.xHorseNo = 0;
          this.programmingDetails.notes = [];
        }
        else {

        }
      });

  }


  onSubmit(form: NgForm) {

    this.errorList = [];

    if (form.value.carnote == "") {
      this.errorList.push('note field is empty');

    }
    else {
      this.programmingDetails.notes.push(form.value.carnote);
      return this.http.put(`https://tapsystock-a6450-default-rtdb.firebaseio.com/programming-details/${this.firebaseKey}.json`, this.programmingDetails).subscribe(
        resData => {

        }
      );

    }
  }

  ngOnInit() {
  }

}
