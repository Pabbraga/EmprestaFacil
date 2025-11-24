import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() {
    this.initializeDefaultData();
  }

  private defaultData = {
    books: [
      {
        id: "1", title: "Fundamentos de bancos de dados", author: "Célio Cardoso Guimarães", publisher: "Unicamp", publicationYear: "2003"
      },
      {
        id: "2", title: "Clean Code", author: "Robert C. Martin", publisher: "Pearson", publicationYear: "2008"
      },
      {
        id: "3", title: "Lógica de Programação", author: "André Luiz Villar", publisher: "Bookman", publicationYear: "2022"
      }
    ],
    members: [
      {
        id: "1", name: "João Ferraz", email: "joaoferraz@email.com"
      },
      {
        id: "2", name: "Letícia Oliveira", email: "leticiaveira@email.com"
      }
    ],
    bookLoans: [
      {
        id: "1", member: {
          id: "1", name: "João Ferraz", email: "joaoferraz@email.com"
        }, book: {
          id: "2", title: "Clean Code", author: "Robert C. Martin", publisher: "Pearson", publicationYear: "2008"
        }, loanDatetime: '2025-11-15T14:30:00-03:00', dueDate: '2025-11-25', isReturned: false, checkoutDatetime: ''
      },
      {
        id: "2", member: {
          id: "2", name: "Letícia Oliveira", email: "leticiaveira@email.com"
        }, book: {
          id: "3", title: "Lógica de Programação", author: "André Luiz Villar", publisher: "Bookman", publicationYear: "2022"
        }, loanDatetime: '2025-11-05T13:46:35-03:00', dueDate: '2025-11-15', isReturned: true, checkoutDatetime: '2025-11-14T14:32:56-03:00'
      },
      {
        id: "3", member: {
          id: "1", name: "João Ferraz", email: "joaoferraz@email.com"
        }, book: {
          id: "1", title: "Fundamentos de bancos de dados", author: "Célio Cardoso Guimarães", publisher: "Unicamp", publicationYear: "2003"
        }, loanDatetime: '2025-11-03T14:30:00-03:00', dueDate: '2025-11-13', isReturned: true, checkoutDatetime: '2025-11-13T10:35:24-03:00'
      }
    ]
  };

  // initializes default data
  private initializeDefaultData(): void {
    if (!localStorage.getItem('books')) {
      localStorage.setItem('books', JSON.stringify(this.defaultData.books));
    }
    if (!localStorage.getItem('members')) {
      localStorage.setItem('members', JSON.stringify(this.defaultData.members));
    }
    if (!localStorage.getItem('bookLoans')) {
      localStorage.setItem('bookLoans', JSON.stringify(this.defaultData.bookLoans));
    }
  }
  
  // saves data into LocalStorage
  setData(dataKey: string, value: any): void {
    localStorage.setItem(dataKey, JSON.stringify(value));
  }

  // gets data from LocalStorage
  getData(dataKey: string): any {
    const item = localStorage.getItem(dataKey);
    return item ? JSON.parse(item) : null;
  }

  // adds item to data LocalStorage
  addItem(dataKey: string, value: any): void {
    const updatedList: any[] = this.getData(dataKey);
    updatedList.push(value);
    this.setData(dataKey, updatedList);
  }

  // searches and updates nested item in bookLoan
  updateNestedItem(dataKey: 'books' | 'members', value: any): void {
    const updatedLoans: any[] = this.getData('bookLoans');
    updatedLoans.map(loan => {
      if (dataKey === 'books' && loan.book?.id === value.id) {
        loan.book = { ...value };
      }
      if (dataKey === 'members' && loan.member?.id === value.id) {
        loan.member = { ...value };
      }
    })

    this.setData('bookLoans', updatedLoans);
  }

  // updates item to data LocalStorage
  updateItem(dataKey: string, index: number, value: any): void {
    const updatedList: any[] = this.getData(dataKey);
    updatedList[index] = { ...value };
    if (dataKey === 'books' || dataKey === 'members') {
      this.updateNestedItem(dataKey, value);
    }
    this.setData(dataKey, updatedList);
  }

  // searches and deletes book
  private updateBookLoansOnDeletion(dataKey: 'books' | 'members', id: string): void {
    const loans: any[] = this.getData('bookLoans');
    const updatedLoans = loans.filter(loan => {
      if (dataKey === 'books') {
        return loan.book.id !== id;
      }
     
      else if (dataKey === 'members') {
        return loan.member.id !== id;
      }
      return true;
    });
    this.setData('bookLoans', updatedLoans);
  }

  // removes item from data LocalStorage
  removeItem(dataKey: string, id: string): void {
    const dataList: any[] = this.getData(dataKey);
    const updatedList = dataList.filter(item => {
      return item.id !== id;
    });
    if (dataKey === 'books' || dataKey === 'members') {
      this.updateBookLoansOnDeletion(dataKey, id);
    }
    this.setData(dataKey, updatedList);
  }

}
