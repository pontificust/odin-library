export const initializeLibrary = (initialBooksData, Book) => {
    let books = [];
    initialBooksData.forEach(data => {
        const book = new Book(data.title, data.author, data.pages, data.isRead);
        books.push(book);
    });
    return books;
}