export const initializeLibrary = (initialBooksData, Book) => {
    let books = [];
    initialBooksData.forEach(data => {
        const book = new Book(data);
        books.push(book);
    });
    return books;
}