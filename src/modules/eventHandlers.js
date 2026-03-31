export const eventHandlers = (books, Book) => {
  const popup = document.querySelector(".main__popup-wrapper");
  const inputTitle = document.querySelector("#title");
  const inputAuthor = document.querySelector("#author");
  const inputPages = document.querySelector("#pages");
  const cardsContainer = document.querySelector(".main__cards");

  const clickEventsHandlers = {
    "main__close-btn": (e) => closeCard(e),
    "main__form-close": () => closePopup(),
    "main__popup-wrapper": () => closePopup(),
    "main__add-button": () => showPopup(),
    main__checkbox: (e) => changeStatus(e),
  };

  const addBookToLibrary = ({ ...FormData }) => {
    console.log(FormData);
    const isRead = FormData.isRead;
    if (typeof isRead === "string") {
      FormData.isRead = isRead === "true" ? true : false;
    }
    const newBook = new Book(FormData);

    books.push(newBook);
  };

  const closePopup = () => {
    const inputRadio = document.querySelector('input[type="radio"]:checked');

    if (inputRadio) {
      inputRadio.checked = false;
    }
    inputTitle.value = "";
    inputAuthor.value = "";
    inputPages.value = "";

    popup.classList.remove("show");
    popup.classList.add("hide");
  };

  const executeDelete = (card) => {
    const deleteIdx = books.findIndex((val) => val.id === card.dataset.id);
    books.splice(deleteIdx, 1);
    cardsContainer.removeChild(card);
  };

  const closeCard = (e) => {
    const card = e.target.closest(".main__card");

    if (!document.startViewTransition) {
      executeDelete(card);
      return;
    }

    document.startViewTransition(() => {
      executeDelete(card);
    });
  };

  const showPopup = () => {
    popup.classList.remove("hide");
    popup.classList.add("show");
  };

  const changeStatus = (e) => {
    const targetCard = e.target.closest(".main__card");
    const targetBook = books.find((book) => book.id === targetCard.dataset.id);
    targetBook.isRead = !targetBook.isRead;
    targetBook.updateStatus();

    targetCard.querySelector(".main__status-text").textContent =
      `Status: ${targetBook.status}`;
    targetCard
      .querySelector(".main__status-icon")
      .setAttribute("src", targetBook.imgURL);
  };

  const handleClickEvent = (e) => {
    const classes = Array.from(e.target.classList);
    const handlerKey = classes.find(
      (className) => clickEventsHandlers[className],
    );

    if (handlerKey) {
      clickEventsHandlers[handlerKey](e);
    }
  };

  const addBook = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    const formProps = Object.fromEntries(data);
    closePopup();
    addBookToLibrary(formProps);
    console.log(formProps);
    let addEvent = new CustomEvent("add book");
    setTimeout(() => {
      document.dispatchEvent(addEvent);
    }, 500);
  };

  document.addEventListener("click", handleClickEvent);
  document.addEventListener("submit", addBook);
};
