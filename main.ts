import { writeFile } from "fs/promises";
import { render } from "./render.js";
import { loadBooks, authors } from "./books.js";

const randomAuthor = Math.floor(Math.random() * authors.length);
export const criteria = authors[randomAuthor];

const books = await loadBooks(100, criteria);
const html = render(books);
await writeFile("books.html", html);
