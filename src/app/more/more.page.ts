import { Component, OnInit } from '@angular/core';
import { DatabaseServiceService } from '../database-service.service';
import { Storage } from '@capacitor/storage';
import { DatabaseServiceTabTwoService } from '../database-service-tab-two.service';
import { ModalserviceService } from '../modalservice.service';


@Component({
  selector: 'app-more',
  templateUrl: './more.page.html',
  styleUrls: ['./more.page.scss'],
})
export class MorePage implements OnInit {

  public username: string = 'user1';

  constructor(private databaseService: DatabaseServiceService, private modalService: ModalserviceService, private databaseServiceTabTwo: DatabaseServiceTabTwoService) { }

  ngOnInit() {  
      Storage.get({key: 'username'}).then(
        storedData => {
          if (!storedData || !storedData.value) {
            return;
          }
          this.username = JSON.parse(storedData.value);
        });
  }

  onClickUsernameSave() {
    
    if (this.username == '' || this.username == null){
      return;
    }
    this.databaseService.setUsername(this.username);
  }

  onCLickMostSelling() {

  }

  // onCLickLowStockItems() {
  //   this.databaseServiceTabTwo.onCLickLowStockItems();
  //   this.modalService.onCLickLowStockItmes();
  // }

}

