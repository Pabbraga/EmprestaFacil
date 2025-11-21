import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton } from '@ionic/angular/standalone';
import { TableListComponent } from 'src/app/components/table-list/table-list.component';
import { Member } from 'src/app/models/member.model';
import { LocalStorageService } from 'src/app/services/local-storage';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.page.html',
  styleUrls: ['./member-list.page.scss', '../../app.component.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, TableListComponent, IonButtons, IonMenuButton]
})
export class MemberListPage implements OnInit {

  members: Member[] = this.localStorage.getData('members');

  headers = ["Nome", "Email"];

  constructor(private localStorage : LocalStorageService) { }

  ngOnInit() {
  }

}
