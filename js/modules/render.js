import { cardClasses } from "./cardClasses.js";

export const render = (books, Book) => {
    console.log(books)
    const cardsContainer = document.querySelector('.main__cards');

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
                } else if (elemType === 'input') {
                    elem.setAttribute('type', 'checkbox');
                }
                parentElem.appendChild(elem);
            } else {
                parentElem.appendChild(createBookCard(book, Object.fromEntries([childrenElems[i]])))
            }
        }
        if (parentElem.classList.contains('main__card')) {
            parentElem.dataset.id = book.id;
            parentElem.style.viewTransitionName = `card-${book.id}`;
        }
        return parentElem;
    }

    const createLibrary = () => {
        cardsContainer.textContent = '';
        for (let i = 0; i < books.length; i += 1) {
            cardsContainer.appendChild(createBookCard(books[i], cardClasses));
        }
    }

    createLibrary();
}