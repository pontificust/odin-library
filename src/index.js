import { render, initializeLibrary, initialBooksData, Book, eventHandlers } from './modules/modules.js';
import './assets/css/style.css';

window.addEventListener('DOMContentLoaded', () => {
    let books = initializeLibrary(initialBooksData, Book);
    render(books, Book);
    eventHandlers(books, Book);
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