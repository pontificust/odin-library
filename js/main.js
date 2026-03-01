import { render, initializeLibrary, initialBooksData, Book, eventHandlers } from './modules/index.js';

window.addEventListener('DOMContentLoaded', () => {
    let books = initializeLibrary(initialBooksData, Book);
    render(books, Book);
    eventHandlers(books, Book);
    console.log(books)
    document.addEventListener('add book', () => {
        if (!document.startViewTransition) {
            render(books, Book);
            return;
        }

        document.startViewTransition(() => {
            render(books, Book);
        })
    });
});