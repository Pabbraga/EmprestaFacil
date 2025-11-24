import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton } from '@ionic/angular/standalone';
import { TableListComponent } from 'src/app/components/table-list/table-list.component';
import { Book } from 'src/app/models/book.model';
import { LocalStorageService } from 'src/app/services/local-storage';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.page.html',
  styleUrls: ['./book-list.page.scss', '../../app.component.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonMenuButton, TableListComponent]
})
export class BookListPage implements OnInit {

  books: Book[] = this.localStorage.getData('books');

  constructor(private localStorage : LocalStorageService) { }

  ngOnInit() {
  }

}
