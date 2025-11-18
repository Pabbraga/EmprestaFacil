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
  loanDatetime: string = new Date().toISOString();
  dueDate: string = new Date().toISOString();
  selectedMember!: Member;
  selectedBook!: Book;

  members: Member[] = [
    {'id': "1", 'name': "João Ferraz", 'email': "joaoferraz@email.com"},
    {'id': "2", 'name': "Letícia Oliveira", 'email': "leticiaveira@email.com"}
  ]

  books: Book[] = [
    {id: "1", title: "Fundamentos de bancos de dados", author: "Célio Cardoso Guimarães", publisher: "Unicamp", publicationYear: "2003"},
    {id: "2", title: "Clean Code", author: "Robert C. Martin", publisher: "Pearson", publicationYear: "2008"},
    {id: "3", title: "Lógica de Programação", author: "André Luiz Villar", publisher: "Bookman", publicationYear: "2022"}
  ];
  
  lastId = (document.querySelector("ion-grid")?.lastElementChild?.id ?? '0');
  
  newItem: Record<string, any> = {};
  
  constructor(private modalCtrl: ModalController, private toastCtrl: ToastController) {}

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
    console.log(this.selectedMember)
    if (this.type === "loan") {
      this.newItem['member'] = this.selectedMember;
      this.newItem['book'] = this.selectedBook;
      this.newItem['loanDatetime'] = this.loanDatetime;
      this.newItem['dueDate'] = this.dueDate;
    }
    this.presentToast();
    return this.modalCtrl.dismiss(this.newItem, 'confirm');
  }
  
  ngOnInit() {
    for (let index of this.indexes) {
      this.newItem[index] = ''
    }
    this.newItem['id'] = (parseInt(this.lastId) + 1).toString();
  }
  
}
