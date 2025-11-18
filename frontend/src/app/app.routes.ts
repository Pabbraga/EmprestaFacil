import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'book-list',
    pathMatch: 'full',
  },
  {
    path: 'book-list',
    loadComponent: () => import('./pages/book-list/book-list.page').then( m => m.BookListPage)
  },
  {
    path: 'member-list',
    loadComponent: () => import('./pages/member-list/member-list.page').then( m => m.MemberListPage)
  },
  {
    path: 'book-loan-list',
    loadComponent: () => import('./pages/book-loan-list/book-loan-list.page').then( m => m.BookLoanListPage)
  }
];
