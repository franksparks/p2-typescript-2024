import { loadBooks } from "./books.js";

const books = await loadBooks(100);

console.log("My books");
console.log(books);
