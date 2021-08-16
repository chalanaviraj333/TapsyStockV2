import { Component, OnInit } from '@angular/core';
import { DatabaseServiceService } from '../database-service.service';
// import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-more',
  templateUrl: './more.page.html',
  styleUrls: ['./more.page.scss'],
})
export class MorePage implements OnInit {

  public username: string = 'user1';

  constructor(private databaseServie: DatabaseServiceService) { }

  ngOnInit() {  
      // Storage.get({key: 'username'}).then(
      //   storedData => {
      //     if (!storedData || !storedData.value) {
      //       return;
      //     }
      //     this.username = JSON.parse(storedData.value);
      //   });
  }

  onClickUsernameSave() {
    
    if (this.username == '' || this.username == null){
      return;
    }
    // this.databaseServie.setUsername(this.username);
  }

}
