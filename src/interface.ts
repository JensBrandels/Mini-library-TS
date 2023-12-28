type hexcolor=string;

interface Book{
    title: string;
    author: string;
    plot: string;
    audience: string;
    year: number
    pages: number;
    publisher: string;
    color: hexcolor;
}

export {Book}