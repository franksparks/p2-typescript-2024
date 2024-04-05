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
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Special+Elite&display=swap" rel="stylesheet">
        <title>${title}</title>
        
        <style>
          body{
            background-color: #6495ED;
            font-family: "Special Elite", system-ui;
          }
          a,
          a:visited,
          a:hover,
          a:active {
            text-decoration: none;
            user-select: none;
            cursor:pointer;
            color: black;
          }
          .book{
            background-color: white;
            outline: black 1px solid;
            margin: 2em auto;
            padding: 0.5em;
            width: 80em;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content:center;
          }
          .record{

          }
          .bookCoverMini{
            width: 5rem;
          }
          .bookCoverDetails{
            width: 10rem;
          }
          .bookPreview{
            margin: 1em
          }
          .bookInfo{
            margin: 1em
          }
          .hover:hover{
            background-color: #D3D3D3;
            box-shadow: 0.75em 1.5em;
          }
          .bold{
            font-weight: bold;
          }
          .under{
            text-decoration: underline;
          }
          .italic{
            font-style: italic;
          }
          h1, h2, .bookInfo h3{
            font-weight: normal;
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
  createFolder(bookFolder);
  let html = "";
  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    renderBook(book);
    html += `
    <a href="/books/${book.edition_key}.html">
      <div class="book hover">
        <img class ="bookCoverMini" src="${
          book.cover_i ? book.cover_i : "Portada no disponible"
        }" />
          <div class="bookPreview">
            <h1>${i + 1}. ${book.title}</h1>
            <h2>${
              book.author_name ? book.author_name : "Autor no especificado"
            }</h2>
          </div>
      </div>
    </a>`;
  }
  return html;
}

async function renderBook(book: Book) {
  const html = ` 
    <html>
        ${generateHead(book.title)}
        <body>
        <h1>Libros de la API de Open Library</h1>
        <h2>Detalles del libro seleccionado</h2>
        <div class="book record">
          <img class ="bookCoverDetails" src="${
            book.cover_i ? book.cover_i : "Portada no disponible"
          }" />
          <div class="bookInfo">
            <h1><span class="bold under">Título:</span> ${
              book.title ? book.title : "Título no disponible."
            }</h1>
            <h2><span class="bold under">Autor:</span> ${
              book.author_name ? book.author_name : "Autor no especificado"
            }</h2>
            <h3><span class="under">Año de publicación:</span> ${
              book.first_publish_year
                ? book.first_publish_year
                : "Información no disponible."
            }</h3>
            <h3><span class="under">Número de páginas (aprox):</span> ${
              book.number_of_pages_median
                ? book.number_of_pages_median
                : "Información no disponible."
            }</h3>
            <h3><span class="under">Valoración media:</span> ${
              book.ratings_average
                ? book.ratings_average
                : "Información no disponible."
            }</h3>
            <h3><span class="under">Primera frase:</span><span class="italic"> ${
              book.first_sentence
                ? book.first_sentence
                : "Información no disponible."
            }</span></h3>
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
    <h1>Libros de la API de Open Library</h1>
    <h2>Selecciona un libro para obtener más información</h2>
      
      <body>
        <div>${renderBooks(books)}</div>
      </body>
    </html>`;
};
