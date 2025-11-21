import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton } from '@ionic/angular/standalone';
import { TableListComponent } from 'src/app/components/table-list/table-list.component';
import { BookLoan } from 'src/app/models/book-loan.model';
import { LocalStorageService } from 'src/app/services/local-storage';

@Component({
  selector: 'app-book-loan-list',
  templateUrl: './book-loan-list.page.html',
  styleUrls: ['./book-loan-list.page.scss', '../../app.component.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, TableListComponent, IonButtons, IonMenuButton]
})
export class BookLoanListPage implements OnInit {

  bookLoans: BookLoan[] = this.localStorage.getData('bookLoans');

  headers = ["Membro", "Email", "Título", "Autor"];

  constructor(private localStorage : LocalStorageService) { }

  ngOnInit() {
  }

}
