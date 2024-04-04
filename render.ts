import { Book } from "./books.js";
import { writeFile } from "fs/promises";
import fs from "fs";

function generateHead(title: string) {
  return `
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="icon" type="image/x-icon" href="/img/bookIcon.png" />
        <title>${title}</title>
        <style>
        body{
            background-color: gray
        }
        a,
        a:visited,
        a:hover,
        a:active {
            text-decoration: underline;
            user-select: none;
            color: #1e1afb;
}
        .book{
            background-color: white;
            outline: black 1px solid;
            margin: 1em;
            padding: 0.5em;
            display: flex;
            flex-direction: row;
            align-items: center;
            margin: 1em;

        }
        .bookCover{
            width: 5rem;
        }
        .bookPageCover{
            width: 10rem;
        }
        .bookPreview{
            margin: 1em
        }
        .bookInfo{
            background-color:white;
            margin: 1em
        }
        .bold{
            font-weight: bold;
        }
        </style>
    </head>`;
}

const bookFolder = "./books/";
function createFolder(bookFolder: string) {
  if (!fs.existsSync(bookFolder)) {
    fs.mkdirSync(bookFolder);
  }
}

function renderBooks(books: Array<Book>) {
  let html = "";
  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    renderBook(book);
    html += `
    <div class="book">
    <img class ="bookCover" src="${
      book.cover_i ? book.cover_i : "Portada no disponible"
    }" />
        <div class="bookPreview">
            <h1>${i + 1}. ${book.title}</h1>
            <h2>${
              book.author_name ? book.author_name : "Autor no especificado"
            }</h2>
            <a href="/books/${book.edition_key}.html" 
            >Más información</a>
        </div>

        
  </div>`;
  }
  return html;
}

async function renderBook(book: Book) {
  createFolder(bookFolder);

  const html = ` 
    <html>
        ${generateHead(book.title)}
        <body>
        <div class="book">
            
                <img class ="bookPageCover" src="${
                  book.cover_i ? book.cover_i : "Portada no disponible"
                }" />
                <div class="bookInfo">
                <p><span class="bold">Título:</span> ${
                  book.title ? book.title : "Título no disponible."
                }</p>
                <p><span class="bold">Autor:</span> ${
                  book.author_name ? book.author_name : "Autor no especificado"
                }</p>
                <p><span class="bold">Año de publicación:</span> ${
                  book.first_publish_year
                    ? book.first_publish_year
                    : "Información no disponible."
                }</p>
                <p><span class="bold">Número de páginas (aprox):</span> ${
                  book.number_of_pages_median
                    ? book.number_of_pages_median
                    : "Información no disponible."
                }</p>
                <p><span class="bold">Valoración media:</span> ${
                  book.ratings_average
                    ? book.ratings_average
                    : "Información no disponible."
                }</p>
                <p><span class="bold">Primera frase:</span> ${
                  book.first_sentence
                    ? book.first_sentence
                    : "Información no disponible."
                }</p>
                </div>
            </div>
        <div>
            <a href="/books.html">Volver a la lista</a>
        </div>
        
        </body>
        </html>`;

  const filename = bookFolder + book.edition_key + ".html";

  await writeFile(filename, html);
}

export const render = (books: Array<Book>) => {
  return `
    <html>
    ${generateHead("Books List")}
      
      <body>
        <p>${renderBooks(books)}</p>
      </body>
    </html>`;
};
