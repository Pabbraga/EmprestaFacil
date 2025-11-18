import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookLoanListPage } from './book-loan-list.page';

describe('BookLoanListPage', () => {
  let component: BookLoanListPage;
  let fixture: ComponentFixture<BookLoanListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BookLoanListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
