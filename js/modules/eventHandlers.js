export const eventHandlers = (books, Book) => {
    const popup = document.querySelector('.main__popup-wrapper');
    const inputTitle = document.querySelector('#title');
    const inputAuthor = document.querySelector('#author');
    const inputPages = document.querySelector('#pages');
    const cardsContainer = document.querySelector('.main__cards');

    const clickEventsHandlers = {
        'main__close-btn': (e) => closeCard(e),
        'main__form-close': () => closePopup(),
        'main__popup-wrapper': () => closePopup(),
        'main__add-button': () => showPopup(),
        'main__checkbox': (e) => changeStatus(e),
    }

    const addBookToLibrary = ({ title, author, pages, isRead }) => {
        const newBook = new Book(title, author, pages, isRead);

        books.push(newBook);
    }

    const closePopup = () => {
        inputTitle.value = '';
        inputAuthor.value = '';
        inputPages.value = '';

        popup.classList.remove('show');
        popup.classList.add('hide');

    }

    const closeCard = (e) => {
        const card = e.target.closest('.main__card');
        card.classList.add('remove');
        const deleteIdx = books.findIndex(val => val.id === card.dataset.id);
        books.splice(deleteIdx, 1);
        cardsContainer.removeChild(card);
    }

    const showPopup = () => {
        popup.classList.remove('hide');
        popup.classList.add('show');
    }

    const changeStatus = (e) => {
        const targetCard = e.target.closest('.main__card');
        const targetBook = books.find(book => book.id === targetCard.dataset.id);
        targetBook.isRead = !targetBook.isRead;
        targetBook.updateStatus();

        targetCard.querySelector('.main__status-text').textContent = `Status: ${targetBook.status}`;
        targetCard.querySelector('.main__status-icon').setAttribute('src', targetBook.imgURL);
    }

    const handleClickEvent = (e) => {
        const classes = Array.from(e.target.classList);
        const handlerKey = classes.find(className => clickEventsHandlers[className]);

        if (handlerKey) {
            clickEventsHandlers[handlerKey](e);
        }
    }

    const addBook = (e) => {
        e.preventDefault();

        const data = new FormData(e.target);
        const formProps = Object.fromEntries(data);
        closePopup();
        addBookToLibrary(formProps);
        let addEvent = new CustomEvent('add book');
        document.dispatchEvent(addEvent);
    }

    document.addEventListener('click', handleClickEvent);
    document.addEventListener('submit', addBook);
}