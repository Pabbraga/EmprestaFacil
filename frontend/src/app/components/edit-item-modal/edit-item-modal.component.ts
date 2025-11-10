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
  selector: 'app-edit-item-modal',
  templateUrl: './edit-item-modal.component.html',
  styleUrls: ['./edit-item-modal.component.scss'],
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
export class EditItemModalComponent implements OnInit {
  
  @Input() itemToModify: Record<string, string> = {};
  @Input() headers!: string[];
  @Input() indexes!: string[];
  
  constructor(private modalCtrl: ModalController, private toastCtrl: ToastController) {}

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Item alterado com sucesso!',
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
    return this.modalCtrl.dismiss(this.itemToModify, 'confirm');
  }
  
  ngOnInit() {
    
  }
  
}
