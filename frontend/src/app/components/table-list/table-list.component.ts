import { Component, OnInit, Input } from '@angular/core';
import { IonGrid, IonCol, IonRow, IonButton, IonIcon, IonToolbar, ModalController, AlertController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addCircleSharp, createSharp, trashSharp } from 'ionicons/icons';
import { Book } from 'src/app/models/book.model';
import { CreateItemModalComponent } from '../create-item-modal/create-item-modal.component';
import { EditItemModalComponent } from '../edit-item-modal/edit-item-modal.component';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss'],
  imports: [IonCol, IonGrid, IonRow, IonButton, IonIcon, IonToolbar],
})
export class TableListComponent implements OnInit {
  
  @Input() itemList: any[] = [];
  @Input() headers!: string[];
  @Input() keys!: any[];

  constructor(private modalCtrl: ModalController, private alertCtrl: AlertController) {
    addIcons({trashSharp, addCircleSharp, createSharp })
  }

  async openCreateItemModal() {
    const modal = await this.modalCtrl.create({
      component: CreateItemModalComponent,
      componentProps: {
        headers: this.headers,
        indexes: this.keys
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.itemList.push(data);
    }
  }

  async openEditItemModal(event : Event) {
    const parentNode = (event.target as HTMLElement).closest('ion-row');
    const id = parentNode?.id;

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
        keys: this.keys
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      const index = this.itemList.findIndex(obj => obj.id === id);
      if (index !== -1) {
        this.itemList[index] = data;
      }
    }
  }

  async openDeleteItemAlert(event : Event) {
    const parentNode = (event.target as HTMLElement).closest('ion-row');
    const id = parentNode?.id;

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
          handler: () => {
            const index = this.itemList.findIndex(item => item.id === id);
            if (index !== -1) {
              this.itemList.splice(index, 1);
            }
          }
        }
      ],
    });

    await alert.present();
  }

  ngOnInit() {}

}
