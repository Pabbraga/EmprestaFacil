import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton } from '@ionic/angular/standalone';
import { TableListComponent } from 'src/app/components/table-list/table-list.component';
import { Book } from 'src/app/models/book.model';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.page.html',
  styleUrls: ['./book-list.page.scss', '../../app.component.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonMenuButton, TableListComponent]
})
export class BookListPage implements OnInit {

  books: Book[] = [
    {id: "1", title: "Fundamentos de bancos de dados", author: "Célio Cardoso Guimarães", publisher: "Unicamp", publicationYear: "2003"},
    {id: "2", title: "Clean Code", author: "Robert C. Martin", publisher: "Pearson", publicationYear: "2008"},
    {id: "3", title: "Lógica de Programação", author: "André Luiz Villar", publisher: "Bookman", publicationYear: "2022"}
  ];

  headers = ["Título", "Autor", "Publicadora", "Ano"];

  indexes = ["id", "title", "author", "publisher", "publicationYear"];

  constructor() { }

  ngOnInit() {
  }

}
