import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { IonGrid, IonCol, IonRow, IonButton, IonIcon, IonToolbar, ModalController, AlertController, ToastController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addCircleSharp, createSharp, trashSharp } from 'ionicons/icons';
import { CreateItemModalComponent } from '../create-item-modal/create-item-modal.component';
import { EditItemModalComponent } from '../edit-item-modal/edit-item-modal.component';
import { LocalStorageService } from 'src/app/services/local-storage';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss'],
  imports: [IonCol, IonGrid, IonRow, IonButton, IonIcon, IonToolbar, DatePipe],
})
export class TableListComponent implements OnInit {
  
  @Input() itemList: any[] = [];
  @Input() headers!: string[];
  @Input() type!: 'item' | 'loan';
  @Input() baseType!: 'books' | 'members' | 'bookLoans'
  keys!: string[];

  constructor(private modalCtrl: ModalController, private alertCtrl: AlertController, private toastCtrl: ToastController, private localStorage: LocalStorageService) {
    addIcons({trashSharp, addCircleSharp, createSharp })
  }

  // gets object keys to use in iterations
  getKeys(): string[] {
    if (this.itemList.length > 0) {
      return Object.keys(this.itemList[0]).filter(key => key !== 'id');
    }
    return [];
  }
  
  async openCreateItemModal() {
    const modal = await this.modalCtrl.create({
      component: CreateItemModalComponent,
      componentProps: {
        headers: this.headers,
        indexes: this.getKeys(),
        type: this.type
      }
    });
    modal.present();
    
    const { data, role } = await modal.onWillDismiss();
    
    if (role === 'confirm') {
      this.localStorage.addItem(this.baseType, data);
      this.itemList = this.localStorage.getData(this.baseType);
    }
  }
  
  async openEditItemModal(event : Event) {
    const parentNode = (event.target as HTMLElement).closest('ion-row');
    const id = parentNode?.id || '';
    
    let itemToModify;
    for (let i of this.itemList) {
      if (i.id === id) {
        itemToModify = structuredClone(i);
      }
    }
    
    const modal = await this.modalCtrl.create({
      component: EditItemModalComponent,
      componentProps: {
        itemToModify: itemToModify,
        headers: this.headers,
        indexes: this.getKeys(),
        type: this.type
      }
    });
    modal.present();
    
    const { data, role } = await modal.onWillDismiss();
    
    if (role === 'confirm') {
      const index = this.itemList.findIndex(obj => obj.id === id);
      if (index !== -1) {
        this.localStorage.updateItem(this.baseType, index, data);
        this.itemList = this.localStorage.getData(this.baseType);
      }
    }
  }
  
  async openDeleteItemAlert(event : Event) {
    const parentNode = (event.target as HTMLElement).closest('ion-row');
    const id = parentNode?.id || '';

    const toast = await this.toastCtrl.create({
      message: 'Item apagado com sucesso!',
      duration: 3000,
      position: 'top',
      color: 'success'
    });
    
    const alert = await this.alertCtrl.create({
      header: 'Apagar',
      message: 'Você deseja continuar?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel'
        },
        {
          text: 'Sim',
          role: 'confirm',
          handler: async () => {
            const itemIndex = this.itemList.findIndex(item => item.id === id);
            if (itemIndex !== -1) {
              this.localStorage.removeItem(this.baseType, id);
              this.itemList = this.localStorage.getData(this.baseType);
              await toast.present(); 
            }
          }
        }
      ],
    });

    if (this.baseType === "books" || this.baseType === "members") {
      alert.message = "Itens vinculados podem ser excluídos. Você deseja continuar?"
    }
    
    await alert.present();
  }
  
  ngOnInit() {
    // loads keys used in iterations to show data on grid
    this.keys = this.getKeys();
  }
  
}
