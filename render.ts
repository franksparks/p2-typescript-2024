import { Book } from "./books.js";
import { writeFile } from "fs/promises";
import fs from "fs";

const head = (title: string) => `
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <style>
        .book{
            outline: black 1px solid;
            margin: 1em;
            padding: 0.5em;
            display: flex;
            flex-direction: row;
            align-items: center;
            margin: 1em;
            cursor:pointer

        }
        .bookCover{
            width: 5rem;
        }
        .bookInfo{
            margin: 1em
        }
        </style>
    </head>`;

const bookFolder = "./books";
function createFolder(bookFolder: string) {
  if (!fs.existsSync(bookFolder)) {
    fs.mkdirSync(bookFolder);
  }
}

function renderBooks(books: Array<Book>) {
  let html = "";
  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    html += `
    <div class="book">
        <img class ="bookCover" src="${
          book.cover_i ? book.cover_i : "Portada no disponible"
        }" />
        <div class="bookInfo">
            <h1>${i + 1}. ${book.title}</h1>
            <h2>${
              book.author_name ? book.author_name : "Autor no especificado"
            }</h2>
            <a href="/books/${book.edition_key}.html" 
            onclick="${renderBook(book.edition_key)}"
            >Más información</a>
        </div>
        
  </div>`;
  }
  return html;
}

async function renderBook(key: string) {
  createFolder(bookFolder);
  const html = ` <p>Test page</p>          `;

  const filename = bookFolder + key + ".html";

  await writeFile(filename, html);
}

export const render = (books: Array<Book>) => {
  return `
    <html>
      ${head("Books List")}
      <body>
        <p>${renderBooks(books)}</p>
      </body>
    </html>`;
};
