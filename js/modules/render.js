import { cardClasses } from "./cardClasses.js";

export const render = () => {
    const cardsContainer = document.querySelector('.main__cards');
    const popup = document.querySelector('.main__popup-wrapper');
    let books = [];

    function Book(title, author, isRead, pages) {

        if (!new.target) {
            throw Error("You must use the 'new' operator to call the constructor");

        }

        let [notRead, read] = ["assets/img/book.png", "assets/img/book-closed.png"]

        this.title = `${title}`;
        this.author = `${author}`;
        this.status = `${isRead ? 'finished' : 'in progress'}`;
        this.pages = `${pages}`;
        this.imgURL = isRead ? read : notRead;
        this.id = crypto.randomUUID();
    }

    const addBookToLibrary = (...bookInfo) => {
        const newBook = new Book(...bookInfo);

        books.push(newBook);
    }

    const createBookCard = (book, elemsObj) => {
        const parentElemClass = Object.keys(elemsObj)[0];
        const childrenObj = elemsObj[parentElemClass].content;
        const parentElem = document.createElement(elemsObj[parentElemClass].type);
        parentElem.classList.add(parentElemClass);
        const childrenElems = Object.entries(childrenObj);
        for (let i = 0; i < childrenElems.length; i += 1) {
            if (!childrenElems[i][1].hasChildren) {
                const elemType = childrenElems[i][1].type;
                const elem = document.createElement(elemType);
                const className = childrenElems[i][0];
                const content = childrenElems[i][1].content;
                elem.classList.add(className);
                elem.textContent = content ? content + ': ' + book[content.toLowerCase()] : '';
                if (elemType === 'img') {
                    elem.setAttribute('src', book.imgURL);
                }
                parentElem.appendChild(elem);
            } else {
                parentElem.appendChild(createBookCard(book, Object.fromEntries([childrenElems[i]])))
            }
        }
        parentElem.dataset.id = book.id;
        return parentElem;
    }

    const createLibrary = () => {
        cardsContainer.textContent = '';
        for (let i = 0; i < books.length; i += 1) {
            cardsContainer.appendChild(createBookCard(books[i], cardClasses));
        }
    }

    const closeElem = (elem) => {
        if(elem.classList.contains('.main__card')){
            card.classList.add('remove');
            books = books.filter(val => val.id !== card.dataset.id);
            setTimeout(() => {
                cardsContainer.removeChild(card);
            }, 1000);
        } else {
            elem.classList.remove('show');
            elem.classList.add('hide');
        }
    }

    const showPopup = () => {
        popup.classList.remove('hide');
        popup.classList.add('show');
    }

    const addBook = () => {
        showPopup();
        addBookToLibrary("Crime and Punishment", 'Fyodor Dostoevsky', true, 530, "assets/img/book.png");
        createLibrary();
    }

    const handleClickEvent = (e) => {
        if (e.target.classList.contains('main__close-btn') ||
    e.target.classList.contains('main__popup-wrapper')) {
            const elem = e.target.closest('.main__card') || 
            e.target.closest('.main__popup-wrapper');
            closeElem(elem);
        } else if(e.target.classList.contains('main__add-button')) {
            addBook();
        }
    }

    document.addEventListener('click', handleClickEvent);
    addBookToLibrary("Crime and Punishment", 'Fyodor Dostoevsky', true, 530, "assets/img/book.png");
    addBookToLibrary("The Hobbit", 'J.R.R. Tolkien', false, 444, "assets/img/book.png");
    createLibrary();
}