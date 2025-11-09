import { Component, OnInit } from '@angular/core';
import { IonGrid, IonCol, IonRow, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addCircleSharp, createSharp, trashSharp } from 'ionicons/icons';
import { Book } from 'src/app/models/book.model';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss'],
  imports: [IonCol, IonGrid, IonRow, IonButton, IonIcon],
})
export class TableListComponent  implements OnInit {
  
  books: Book[] = [
    {title: "Fundamentos de bancos de dados", author: "Célio Cardoso Guimarães", publisher: "Unicamp", publicationYear: "2003"},
    {title: "Clean Code", author: "Robert C. Martin", publisher: "Pearson", publicationYear: "2008"},
    {title: "Lógica de Programação", author: "André Luiz Villar", publisher: "Bookman", publicationYear: "2022"}
  ]
  
  headers = ["Título", "Autor", "Publicadora", "Ano"]

  indexes: (keyof Book)[] = ["title", "author", "publisher", "publicationYear"]

  constructor() {
    addIcons({trashSharp, addCircleSharp, createSharp })
  }

  ngOnInit() {}

}
