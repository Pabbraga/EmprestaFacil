import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonTitle,
  IonToolbar,
  ModalController,
  ToastController
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-create-item-modal',
  templateUrl: './create-item-modal.component.html',
  styleUrls: ['./create-item-modal.component.scss'],
  imports: [
    FormsModule,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonTitle,
    IonToolbar,
  ],
})
export class CreateItemModalComponent implements OnInit {
  
  @Input() headers: string[] = [];
  @Input() indexes: string[] = [];
  
  lastId = (document.querySelector("ion-grid")?.lastElementChild?.id ?? '0');
  
  newItem: Record<string, string> = {};
  
  constructor(private modalCtrl: ModalController, private toastCtrl: ToastController) {}

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Item adicionado com sucesso!',
      duration: 3000,
      position: 'top',
      color: 'success'
    });
    
    await toast.present();
  }
  
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    this.presentToast();
    return this.modalCtrl.dismiss(this.newItem, 'confirm');
  }
  
  ngOnInit() {
    for (let index of this.indexes) {
      this.newItem[index] = ''
    }
    this.newItem['id'] = (parseInt(this.lastId) + 1).toString();
  }
  
}
