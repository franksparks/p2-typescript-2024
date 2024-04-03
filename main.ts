import { render } from "./render.js";
import { loadBooks } from "./books.js";

const books = await loadBooks(100);
const html = render(books);

console.log("My books");
console.log(books);
console.log(html);
