export const eventHandlers = (books, Book) => {
  const popup = document.querySelector(".main__popup-wrapper");
  const cardsContainer = document.querySelector(".main__cards");

  const clickEventsHandlers = {
    "main__close-btn": (e) => closeCard(e),
    "main__form-close": () => closePopup(),
    "main__popup-wrapper": () => closePopup(),
    "main__add-button": () => showPopup(),
    main__checkbox: (e) => changeStatus(e),
  };

  const addBookToLibrary = ({ ...FormData }) => {
    const isRead = FormData.isRead;
    if (typeof isRead === "string") {
      FormData.isRead = isRead === "true" ? true : false;
    }
    const newBook = new Book(FormData);

    books.push(newBook);
  };

  const closePopup = () => {
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

  const inputHandler = (() => {

    const clearValidityMsg = (input) => {
      input.setCustomValidity("");
    };

    function setValidityMsg(input) {
      const id = input.id;
      const msg =
        id === "pages"
          ? `The book must contain at least 1 page.`
          : `The ${id} name must be filled.`;
      input.setCustomValidity(msg);
    }

    function handleInputEvent(e) {
      const input = e.target;
      clearValidityMsg(input);

      if (!input.validity.valid) {
        setValidityMsg(input);
      }
    }

    return { handleInputEvent, setValidityMsg };
  })();

  const addBook = (e) => {
    e.preventDefault();
    const form = e.target;

    const data = new FormData(form);
    const formProps = Object.fromEntries(data);
    closePopup();
    addBookToLibrary(formProps);
    let addEvent = new CustomEvent("add book");
    setTimeout(() => {
      document.dispatchEvent(addEvent);
    }, 500);
    form.reset();
  };

  document.addEventListener("click", handleClickEvent);
  document.addEventListener("submit", addBook);
  document.addEventListener("input", inputHandler.handleInputEvent);
  document.addEventListener(
    "invalid",
    (e) => {
      const input = e.target;
      inputHandler.setValidityMsg(input);
    },
    true,
  );
};
