import bookClosed from "../assets/img/book-closed.png";
import book from "../assets/img/book.png";

export class Book {
    #imgURLs = { notRead: book, 
        read: bookClosed };

    constructor({title, author, pages, isRead}) {
        this.title = `${title}`;
        this.author = `${author}`;
        this.status = `${isRead ? 'finished' : 'in progress'}`;
        this.pages = `${pages}`;
        this.imgURL = isRead ? this.#imgURLs.read : this.#imgURLs.notRead;
        this.id = crypto.randomUUID();
        this.isRead = isRead;
    };

    updateStatus() {
        this.status = `${this.isRead ? 'finished' : 'in progress'}`;
        this.imgURL = this.isRead ? this.#imgURLs.read : this.#imgURLs.notRead;
    };
}