import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatabaseServiceService } from '../database-service.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {

  constructor(private modalController: ModalController, public databaseService: DatabaseServiceService) { }

  ngOnInit() {
  }

  _onClickDismiss() {
    this.modalController.dismiss();
  }

  onClickFilter(selectedfilter) {
    // this.databaseService.filterButton(selectedfilter);
  }

}
