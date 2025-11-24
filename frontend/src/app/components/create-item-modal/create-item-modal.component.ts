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
  IonSelect,
  IonSelectOption
} from '@ionic/angular/standalone';
import { Book } from 'src/app/models/book.model';
import { Member } from 'src/app/models/member.model';
import { LocalStorageService } from 'src/app/services/local-storage';

@Component({
  selector: 'app-create-item-modal',
  templateUrl: './create-item-modal.component.html',
  styleUrls: ['./create-item-modal.component.scss', '../table-list/table-list.component.scss'],
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
    IonSelect,
    IonSelectOption
  ],
})
export class CreateItemModalComponent implements OnInit {
  
  @Input() headers!: string[];
  @Input() indexes!: string[];
  @Input() type!: string;

  members: Member[] = this.localStorage.getData('members');
  books: Book[] = this.localStorage.getData('books');
  
  lastId = (document.querySelector("ion-grid")?.lastElementChild?.id ?? '0');
  
  newItem: Record<string, any> = {};
  
  constructor(private modalCtrl: ModalController, private toastCtrl: ToastController, private localStorage: LocalStorageService) {}

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
    this.newItem['id'] = (parseInt(this.lastId) + 1).toString();
    this.presentToast();
    return this.modalCtrl.dismiss(this.newItem, 'confirm');
  }
  
  ngOnInit() {
    // sets initial data
    this.newItem['loanDatetime'] = new Date().toISOString();
    this.newItem['dueDate'] = new Date().toISOString();
  }
  
}
