import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatabaseServiceService } from '../database-service.service';
import { GarageRemote } from '../interfaces/garage-remote';
import { NgForm } from "@angular/forms";
import { RemoteNote } from '../remote-note';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-view-garage-remote-details',
  templateUrl: './view-garage-remote-details.page.html',
  styleUrls: ['./view-garage-remote-details.page.scss'],
})
export class ViewGarageRemoteDetailsPage implements OnInit {

  @Input() selectedGarageRemote : GarageRemote;

  private username: string = 'User1';

  constructor(private modalController: ModalController, private databaseService: DatabaseServiceService) { }

  ngOnInit() {
    Storage.get({key: 'username'}).then(
      storedData => {
        if (!storedData || !storedData.value) {
          return;
        }
        this.username = JSON.parse(storedData.value);
      });

  }

  _onClickDismiss() {
    this.modalController.dismiss();
  }

  onSubmit(form: NgForm) {
    const newRemoteNote: RemoteNote = {
      username: this.username,
      notebodyText: form.value.remotenote
    };
    if (this.selectedGarageRemote.notes == undefined) {
      this.selectedGarageRemote.notes = [];
    }

    this.selectedGarageRemote.notes.push(newRemoteNote);
    form.reset();
    // this.databaseService.addremoteNote(this.selectedRemote);
    this.modalController.dismiss();
    
  }

}
