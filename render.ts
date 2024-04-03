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
            padding: 0.5em
        }
        </style>
    </head>`;

function renderBooks(books: Array<Book>) {
  let html = "";
  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    html += `
    <div class="book">
    
        <div class="bookCover"></div>
        <div class="bookInfo">
            <h2>${i + 1}. ${book.title}</h2>
            <h3>${
              book.author_name ? book.author_name : "Autor no especificado"
            }</h3>
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
