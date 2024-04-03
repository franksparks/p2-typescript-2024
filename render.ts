import { Book } from "./books.js";

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
        }
        .bookCover{
            width: 5rem;
            cursor:pointer
        }
        .bookInfo{
            margin: 1em
        }
        </style>
    </head>`;

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
        </div>
  </div>`;
  }
  return html;
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
