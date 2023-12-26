var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let content = document.getElementById("allBooks");
function fetchBookData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books');
            const data = yield response.json();
            useBookData(data);
        }
        catch (error) {
            console.log("error:", error);
            return [];
        }
    });
}
fetchBookData();
function useBookData(bookData) {
    bookData.forEach(book => {
        const newBookDiv = document.createElement("div");
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
        newBookDiv.addEventListener("click", () => {
            console.log(book, "clicked");
        });
    });
}
