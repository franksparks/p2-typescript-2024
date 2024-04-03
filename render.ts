import { Book } from "./books.js";

const head = (title: string) => `
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <style>
        </style>
    </head>`;

export const render = (books: Array<Book>) => {
  return `
    <html>
      ${head("Books List")}
      <body>
      <p>Lorem Ipsum</p>
      </body>
    </html>`;
};
