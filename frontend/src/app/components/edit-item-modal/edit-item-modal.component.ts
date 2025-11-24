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
  IonLabel,
  IonToolbar,
  ModalController,
  ToastController,
  IonDatetime,
  IonDatetimeButton,
  IonModal,
  IonCheckbox,
  IonSelect,
  IonSelectOption
} from '@ionic/angular/standalone';
import { Book } from 'src/app/models/book.model';
import { Member } from 'src/app/models/member.model';

@Component({
  selector: 'app-edit-item-modal',
  templateUrl: './edit-item-modal.component.html',
  styleUrls: ['./edit-item-modal.component.scss', '../table-list/table-list.component.scss'],
  imports: [
    FormsModule,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonTitle,
    IonLabel,
    IonToolbar,
    IonDatetime,
    IonDatetimeButton,
    IonModal,
    IonCheckbox,
    IonSelect,
    IonSelectOption
  ],
})
export class EditItemModalComponent implements OnInit {
  
  @Input() itemToModify: Record<string, any> = {};
  @Input() headers!: string[];
  @Input() indexes!: string[];
  @Input() type!: string;

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
    if (this.type === "loan") {
      // if there is no checkoutDatetime use a new Date with now
      this.itemToModify['checkoutDatetime'] = this.itemToModify['checkoutDatetime'] ? this.itemToModify['checkoutDatetime'] : new Date().toISOString();
    }
  }
  
}
