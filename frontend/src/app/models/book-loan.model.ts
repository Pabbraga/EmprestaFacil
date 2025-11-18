import { Book } from "./book.model";
import { Member } from "./member.model";

export interface BookLoan {
    id: string,
    member: Member,
    book: Book,
    loanDatetime: string,
    dueDate: string,
    isReturned: Boolean,
    checkoutDatetime: string
}