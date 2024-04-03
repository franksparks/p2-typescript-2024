import { loadBooks } from "./books.js";

const books = await loadBooks(50);

console.log("My books");
console.log(books);
