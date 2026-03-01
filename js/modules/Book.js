export function Book(title, author, pages, isRead) {

    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");

    }

    this.title = `${title}`;
    this.author = `${author}`;
    this.status = `${isRead ? 'finished' : 'in progress'}`;
    this.pages = `${pages}`;
    this.imgURL = isRead ? this.imgURLs.read : this.imgURLs.notRead;
    this.id = crypto.randomUUID();
    this.isRead = isRead;
}

Book.prototype.updateStatus = function () {
    this.status = `${this.isRead ? 'finished' : 'in progress'}`;
    this.imgURL = this.isRead ? this.imgURLs.read : this.imgURLs.notRead;
}

Book.prototype.imgURLs = { notRead: "assets/img/book.png", read: "assets/img/book-closed.png" };
