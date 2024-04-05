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
        <link rel="stylesheet" href="../styles.css" />

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
  let html =
    "<a href='#body'><button class='upButton'>&#8593;Volver arriba</button></a>";
  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    renderBook(book);
    html += `
    <a class="mainLink" href="/books/${book.edition_key}.html">
      <div class="book hover back">
        <img class ="bookCoverMini" src="${
          book.cover_i ? book.cover_i : "./img/notFound.png"
        }" />
          <div class="bookPreview">
            <h2>${i + 1}. <span class="italic">${book.title}</span></h2>
            <h3>${book.author_name ? book.author_name : "Autor no especificado"}
          </div>
      </div>
    </a>`;
  }
  html += `
  <a href="https://github.com/franksparks" target="”_blank”">
    <footer>
      ©Ferran Bals Moreno 2024
    </footer>
  </a>`;
  return html;
}

async function renderBook(book: Book) {
  const html = ` 
    <html>
        ${generateHead(book.title)}
        <main>
        <body>
        <h1>Libros de la API de Open Library</h1>
        <h2>Detalles del libro seleccionado</h2>
        <div class="book">
          <img class ="bookCoverDetails" src="${
            book.cover_i ? book.cover_i : "../img/notFound.png"
          }" />
          <div class="bookInfo">
            <h2><span class="bold under">Título:</span> <span class="italic">${
              book.title ? book.title : "Título no disponible."
            }</span></h2>
            <h3><span class="bold under">Autor:</span> ${
              book.author_name ? book.author_name : "Autor no especificado"
            }</h3>
            <h4><span class="under">Año de publicación:</span> ${
              book.first_publish_year
                ? book.first_publish_year
                : "Información no disponible."
            }</h4>
            <h4><span class="under">Número de páginas (aprox):</span> ${
              book.number_of_pages_median
                ? book.number_of_pages_median + " páginas."
                : "Información no disponible."
            }</h4>
            <h4><span class="under">Valoración media:</span> ${
              book.ratings_average
                ? book.ratings_average.toFixed(2) + "/5"
                : "Información no disponible."
            }</h4>
            <h4><span class="under">Primera frase:</span><span class="italic"> ${
              book.first_sentence
                ? book.first_sentence
                : "Información no disponible."
            }</span></h4>
            <h4>
              <a target="_blank" href="${
                book.author_profile
              }"><button class="record">Perfil del autor en Open Library</button></a>
            </h4>
            <h4>
              <a target="_blank" href="${
                book.book_profile
              }"><button class="record">Perfil del libro en Open Library</button>
              </a>
            </h4>
          </div>
        </div>
        
        <a href="/books.html">
          <button>&#8592; Volver a la lista</button>
        </a
        </main>

        <a href="https://github.com/franksparks" target="”_blank”">
          <footer>
        ©
        
          Ferran Bals Moreno
        2024
      </footer>
      </a
        >
 
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
    <h3>Criterio de búsqueda: <span class="italic">"Philip K. Dick"</span></h3>
      
      <body id="body">
        <div>${renderBooks(books)}</div>
      </body>
    </html>`;
};
