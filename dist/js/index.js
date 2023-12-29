var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const API = "https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books";
const svgLink = `<svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="19" cy="19" r="19" fill="#8A8A8A"/>
<path d="M6.29289 18.2929C5.90237 18.6834 5.90237 19.3166 6.29289 19.7071L12.6569 26.0711C13.0474 26.4616 13.6805 26.4616 14.0711 26.0711C14.4616 25.6805 14.4616 25.0474 14.0711 24.6569L8.41421 19L14.0711 13.3431C14.4616 12.9526 14.4616 12.3195 14.0711 11.9289C13.6805 11.5384 13.0474 11.5384 12.6569 11.9289L6.29289 18.2929ZM31 18L7 18V20L31 20V18Z" fill="black" fill-opacity="0.8"/>
</svg>`;
let modal = document.getElementById("myModal");
let content = document.getElementById("allBooks");
const fetchBookData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(API);
        const data = yield response.json();
        return data;
    }
    catch (error) {
        console.log("Failed to fetch API", error);
        return [];
    }
});
function initializePage() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const bookData = yield fetchBookData();
            updateBookList(bookData);
        }
        catch (error) {
            console.log("Failed to initialize", error);
        }
    });
}
initializePage();
function displayBookList(bookData) {
    bookData.forEach((book) => {
        const bookDiv = createBookDiv(book);
        content.appendChild(bookDiv);
        bookDiv.addEventListener("click", () => {
            modal.innerHTML = "";
            displayBookDetails(book);
        });
    });
}
function updateBookList(bookData) {
    const displayBooks = (books) => {
        content.innerHTML = "";
        displayBookList(books);
    };
    displayBooks(bookData);
    const inputField = document.getElementById("myInput");
    inputField.addEventListener("input", (event) => {
        const searchText = event.target.value.toLowerCase();
        const filteredBooks = bookData.filter((book) => {
            return book.title.toLowerCase().includes(searchText);
        });
        displayBooks(filteredBooks);
    });
}
function createBookDiv(book) {
    const newBookDiv = document.createElement("div");
    newBookDiv.className = "bookDiv";
    content.appendChild(newBookDiv);
    const addArticle = document.createElement("article");
    const bookTitle = document.createElement("h3");
    const bookAuthor = document.createElement("p");
    bookTitle.innerText = book.title;
    bookAuthor.innerText = book.author;
    newBookDiv.appendChild(addArticle);
    addArticle.appendChild(bookTitle);
    addArticle.appendChild(bookAuthor);
    newBookDiv.style.backgroundColor = book.color;
    return newBookDiv;
}
function displayBookDetails(bookInfo) {
    showOrHideModal();
    const bookArticle = document.createElement("div");
    bookArticle.className = "bookInfo";
    modal.appendChild(bookArticle);
    let clickedBook = createBookDiv(bookInfo);
    bookArticle.appendChild(clickedBook);
    const anotherDiv = document.createElement("div");
    anotherDiv.className = "infoText";
    bookArticle.appendChild(anotherDiv);
    const bookTitle = document.createElement("h3");
    const bookAuthor = document.createElement("p");
    const bookPlot = document.createElement("p");
    const infoBox = document.createElement("div");
    const bookAudience = document.createElement("p");
    const bookPages = document.createElement("p");
    const bookPublish = document.createElement("p");
    const bookPublisher = document.createElement("p");
    if (bookInfo.pages == null) {
        bookPages.innerText = `Pages: Unknown`;
    }
    else {
        bookPages.innerText = `Pages: ${bookInfo.pages}`;
    }
    bookTitle.innerText = bookInfo.title;
    bookAuthor.innerText = bookInfo.author;
    bookPlot.innerText = bookInfo.plot;
    infoBox.className = "infoBox";
    bookAudience.innerText = `Audience: ${bookInfo.audience}`;
    bookPublish.innerText = `First published: ${bookInfo.year}`;
    bookPublisher.innerText = `Publisher: ${bookInfo.publisher}`;
    anotherDiv.appendChild(bookTitle);
    anotherDiv.appendChild(bookAuthor);
    anotherDiv.appendChild(bookPlot);
    anotherDiv.appendChild(infoBox);
    infoBox.appendChild(bookAudience);
    infoBox.appendChild(bookPages);
    infoBox.appendChild(bookPublish);
    infoBox.appendChild(bookPublisher);
    const wantToReadButton = document.createElement("button");
    wantToReadButton.innerText = "Oh, i want to read it!";
    anotherDiv.appendChild(wantToReadButton);
}
function showOrHideModal() {
    modal.style.display = "flex";
    const backBtn = document.createElement("div");
    backBtn.className = "backBtn";
    backBtn.innerHTML = svgLink;
    modal.appendChild(backBtn);
    backBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });
}
export {};
