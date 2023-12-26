interface Book{
    title: string;
    author: string;
    plot: string;
    audience: string;
    firstPublished: number
    pages: number;
    publisher: string;
    color?: string;
}

let content = document.getElementById("allBooks")

async function fetchBookData(): Promise<Book[]> {
    try {
        const response = await fetch('https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books')
        const data: Book[] = await response.json();
        // console.log(data);
        // return data
        useBookData(data)
    } catch(error){
        console.log("error:", error);
        return []
    }
}

fetchBookData()

function useBookData(bookData: Book[]) {
    bookData.forEach(book => {
        // console.log(book);
        //create div for every book object we find
        const newBookDiv: HTMLDivElement = document.createElement("div")
        content.appendChild(newBookDiv) //append it so it's always there first

        //Get every other element that should be in the article here
        const addArticle: HTMLElement = document.createElement("article")
        const bookTitle: HTMLHeadingElement = document.createElement("h3")
        const bookAuthor: HTMLParagraphElement = document.createElement("p")

        //choose what should be written inside the elements we create
        bookTitle.innerText = book.title
        bookAuthor.innerText = book.author

        //append them in the right order to see them on the page
        newBookDiv.appendChild(addArticle)
        addArticle.appendChild(bookTitle)
        addArticle.appendChild(bookAuthor)
        
        //get the correct color for every article
        newBookDiv.style.backgroundColor = book.color

        //add eventlistener on every div element created
        newBookDiv.addEventListener("click", (): void=>{
            console.log(book,"clicked");
            
        })
    });
}

