import { Component, OnInit } from '@angular/core';
import { IonGrid, IonCol, IonRow, IonButton, IonIcon, ModalController, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addCircleSharp, createSharp, trashSharp } from 'ionicons/icons';
import { Book } from 'src/app/models/book.model';
import { CreateItemModalComponent } from '../create-item-modal/create-item-modal.component';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss'],
  imports: [IonCol, IonGrid, IonRow, IonButton, IonIcon, IonToolbar],
})
export class TableListComponent implements OnInit {
  
  books: Book[] = [
    {id: "1", title: "Fundamentos de bancos de dados", author: "Célio Cardoso Guimarães", publisher: "Unicamp", publicationYear: "2003"},
    {id: "2", title: "Clean Code", author: "Robert C. Martin", publisher: "Pearson", publicationYear: "2008"},
    {id: "3", title: "Lógica de Programação", author: "André Luiz Villar", publisher: "Bookman", publicationYear: "2022"}
  ]
  
  headers = ["Título", "Autor", "Publicadora", "Ano"]

  indexes: (keyof Book)[] = ["id", "title", "author", "publisher", "publicationYear"]

  constructor(private modalCtrl: ModalController) {
    addIcons({trashSharp, addCircleSharp, createSharp })
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: CreateItemModalComponent,
      componentProps: {
        headers: this.headers,
        indexes: this.indexes
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.books.push(data);
    }
  }

  ngOnInit() {}

}
