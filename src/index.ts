import { Book } from "./interface.js";

//constant variables
const API =
  "https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books";
const svgLink = `<svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="19" cy="19" r="19" fill="#8A8A8A"/>
<path d="M6.29289 18.2929C5.90237 18.6834 5.90237 19.3166 6.29289 19.7071L12.6569 26.0711C13.0474 26.4616 13.6805 26.4616 14.0711 26.0711C14.4616 25.6805 14.4616 25.0474 14.0711 24.6569L8.41421 19L14.0711 13.3431C14.4616 12.9526 14.4616 12.3195 14.0711 11.9289C13.6805 11.5384 13.0474 11.5384 12.6569 11.9289L6.29289 18.2929ZM31 18L7 18V20L31 20V18Z" fill="black" fill-opacity="0.8"/>
</svg>`;

//Global variables
let modal = document.getElementById("myModal") as HTMLElement;
let content = document.getElementById("allBooks") as HTMLElement;

//Fetch function to get book data from the API
const fetchBookData = async(): Promise<Book[]> => {
  try {
    const response = await fetch(API);
    const data: Book[] = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.log("Failed to fetch API", error);
    return [];
  }
}

//Function to initialize the page
async function initializePage(): Promise<void> {
  try {
    const bookData: Book[] = await fetchBookData();
    updateBookList(bookData);
  } catch (error) {
    console.log("Failed to initialize", error);
  }
}

//initialize page on load
initializePage();

//function to display books in the content DOMarea
function displayBookList(bookData: Book[]) {
  bookData.forEach((book) => {
    const bookDiv = createBookDiv(book);
    content.appendChild(bookDiv);

    //add eventlistener on every div element created
    bookDiv.addEventListener("click", (): void => {
      modal.innerHTML = "";

      //call on the info on specific book
      displayBookDetails(book);
    });
  });
}

//Function to update the book list based on input
function updateBookList(bookData: Book[]) {
  //This function is to show the books that we have filtered
  const showFilteredBooks = (books: Book[]) => {
    content.innerHTML = "";
    displayBookList(books); //this is the function that loops through the API array objects and show them on the page
  };
  //call on the filter function
  showFilteredBooks(bookData);

  //input DOM
  const inputField = document.getElementById("myInput") as HTMLElement;
  //add a listener to the inputfield
  inputField.addEventListener("input", (event) => {
    const searchText = (event.target as HTMLInputElement).value.toLowerCase(); //get the value
    //function to filter and compare it to the value
    const filteredBooks = bookData.filter((book) => {
      return book.title.toLowerCase().includes(searchText);
    });
    showFilteredBooks(filteredBooks);
  });
}

function createBookDiv(book: Book): HTMLElement {
  //create div for every book object we find
  const newBookDiv: HTMLDivElement = document.createElement("div");
  newBookDiv.className = "bookDiv";
  content.appendChild(newBookDiv); //append it so it's always there first

  //Get every other element that should be in the article here
  const addArticle: HTMLElement = document.createElement("article");
  const bookTitle: HTMLHeadingElement = document.createElement("h3");
  const bookAuthor: HTMLParagraphElement = document.createElement("p");

  //choose what should be written inside the elements we create
  bookTitle.innerText = book.title;
  bookAuthor.innerText = book.author;

  //append them in the right order to see them on the page
  newBookDiv.appendChild(addArticle);
  addArticle.appendChild(bookTitle);
  addArticle.appendChild(bookAuthor);

  //get the correct color for every article
  newBookDiv.style.backgroundColor = book.color;

  return newBookDiv;
}

//Function to display detailed book information
function displayBookDetails(bookInfo: Book) {
  // console.log("clickfunction",bookInfo );

  //show modal as soon as you click / also to create button to hide again
  showOrHideModal();

  //add another div to append to to make styling easier
  const bookArticle: HTMLDivElement = document.createElement("div");
  bookArticle.className = "bookInfo";
  modal.appendChild(bookArticle);

  //Function saved in variable to be able to append what it brings
  let clickedBook: HTMLElement = createBookDiv(bookInfo);
  bookArticle.appendChild(clickedBook);

  const anotherDiv: HTMLDivElement = document.createElement("div");
  anotherDiv.className = "infoText";
  bookArticle.appendChild(anotherDiv);

  //create the element we need
  const bookTitle: HTMLHeadingElement = document.createElement("h3");
  const bookAuthor: HTMLParagraphElement = document.createElement("p");
  const bookPlot: HTMLParagraphElement = document.createElement("p");
  const infoBox: HTMLDivElement = document.createElement("div"); //div for the small infobox in anotherDiv Variable
  const bookAudience: HTMLParagraphElement = document.createElement("p");
  const bookPages: HTMLParagraphElement = document.createElement("p");
  const bookPublish: HTMLParagraphElement = document.createElement("p");
  const bookPublisher: HTMLParagraphElement = document.createElement("p");

  //since there is pages that is NULL, i change it so we write pages as unknown instead
  if (bookInfo.pages == null) {
    bookPages.innerText = `Pages: Unknown`;
  } else {
    bookPages.innerText = `Pages: ${bookInfo.pages}`;
  }

  //choose what to write in the element we just created
  bookTitle.innerText = bookInfo.title;
  bookAuthor.innerText = bookInfo.author;
  bookPlot.innerText = bookInfo.plot;
  infoBox.className = "infoBox";
  bookAudience.innerText = `Audience: ${bookInfo.audience}`;
  bookPublish.innerText = `First published: ${bookInfo.year}`;
  bookPublisher.innerText = `Publisher: ${bookInfo.publisher}`;

  //append all elements we need here in the correct order
  anotherDiv.appendChild(bookTitle);
  anotherDiv.appendChild(bookAuthor);
  anotherDiv.appendChild(bookPlot);
  anotherDiv.appendChild(infoBox);

  //append inside the infobox
  infoBox.appendChild(bookAudience);
  infoBox.appendChild(bookPages);
  infoBox.appendChild(bookPublish);
  infoBox.appendChild(bookPublisher);

  const wantToReadButton: HTMLButtonElement = document.createElement("button");
  wantToReadButton.innerText = "Oh, i want to read it!";
  anotherDiv.appendChild(wantToReadButton);
}

function showOrHideModal(): void {
  //show modal
  modal.style.display = "flex";

  //create backBtn
  const backBtn: HTMLDivElement = document.createElement("div");
  backBtn.className = "backBtn";
  backBtn.innerHTML = svgLink;
  modal.appendChild(backBtn);

  //make the button clickable to get back/hide modal
  backBtn.addEventListener("click", (): void => {
    modal.style.display = "none";
  });
}
