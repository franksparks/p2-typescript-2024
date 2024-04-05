import { writeFile } from "fs/promises";
import { render } from "./render.js";
import { loadBooks } from "./books.js";

//Criterio por defecto
const criteria = "Philip K. Dick";
const books = await loadBooks(100, criteria);
const html = render(books);
await writeFile("books.html", html);
