import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Remote } from '../remote';
import { NgForm } from "@angular/forms";
import { RemoteNote } from '../remote-note';
import { DatabaseServiceService } from '../database-service.service';
// import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-remotedetailsmodal',
  templateUrl: './remotedetailsmodal.page.html',
  styleUrls: ['./remotedetailsmodal.page.scss'],
})
export class RemotedetailsmodalPage implements OnInit {

  @Input() selectedRemote : Remote;

  private username: string = 'User1';

  constructor(private modalController: ModalController, private databaseService: DatabaseServiceService) { }

  ngOnInit() {
    // Storage.get({key: 'username'}).then(
    //   storedData => {
    //     if (!storedData || !storedData.value) {
    //       return;
    //     }
    //     this.username = JSON.parse(storedData.value);
    //   });

  }

  _onClickDismiss() {
    this.modalController.dismiss();
  }

  onSubmit(form: NgForm) {
    const newRemoteNote: RemoteNote = {
      username: this.username,
      notebodyText: form.value.remotenote
    };

    this.selectedRemote.notes.push(newRemoteNote);
    this.databaseService.addremoteNote(this.selectedRemote);
    
  }

}
