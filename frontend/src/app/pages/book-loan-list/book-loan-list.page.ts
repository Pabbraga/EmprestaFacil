import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton } from '@ionic/angular/standalone';
import { TableListComponent } from 'src/app/components/table-list/table-list.component';
import { BookLoan } from 'src/app/models/book-loan.model';

@Component({
  selector: 'app-book-loan-list',
  templateUrl: './book-loan-list.page.html',
  styleUrls: ['./book-loan-list.page.scss', '../../app.component.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, TableListComponent, IonButtons, IonMenuButton]
})
export class BookLoanListPage implements OnInit {

  bookLoans: BookLoan[] = [
    {
      id: "1", member: {
        id: "1", name: "João Ferraz", email: "joaoferraz@email.com"
      }, book: {
        id: "2", title: "Clean Code", author: "Robert C. Martin", publisher: "Pearson", publicationYear: "2008"
      }, loanDatetime: '2025-11-15T14:30:00Z', dueDate: '2025-11-25', isReturned: false, checkoutDatetime: ''
    },
    {
      id: "2", member: {
        id: "2", name: "Letícia Oliveira", email: "leticiaveira@email.com"
      }, book: {
        id: "3", title: "Lógica de Programação", author: "André Luiz Villar", publisher: "Bookman", publicationYear: "2022"
      }, loanDatetime: '2025-11-05T13:46:35Z', dueDate: '2025-11-15', isReturned: true, checkoutDatetime: '2025-11-14T14:32:56Z'
    },
    {
      id: "3", member: {
        id: "1", name: "João Ferraz", email: "joaoferraz@email.com"
      }, book: {
        id: "1", title: "Fundamentos de bancos de dados", author: "Célio Cardoso Guimarães", publisher: "Unicamp", publicationYear: "2003"
      }, loanDatetime: '2025-11-03T14:30:00Z', dueDate: '2025-11-13', isReturned: true, checkoutDatetime: '2025-11-13T10:35:24Z'
    }
  ]

  headers = ["Membro", "Email", "Título", "Autor"];

  indexes = ["id", "member.name", "member.email", "book.title", "book.author"];

  constructor() { }

  ngOnInit() {
  }

}
