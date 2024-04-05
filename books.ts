export class Book {
  constructor(
    public author_name: string, //23
    public cover_i: string | undefined, //39
    public edition_count: number, //43
    public edition_key: string, //44
    public first_publish_year: number, //151
    public first_sentence: string, //152
    public key: string, //410
    public number_of_pages_median: number, //452
    public title: "string", //855
    public ratings_average: number, //1167
    public author_profile: string,
    public book_profile: string
  ) {}
}

export const loadBooks = async (n: number) => {
  const response = await fetch(
    `https://openlibrary.org/search.json?q=ciencia-ficcion`
  );

  const { docs } = (await response.json()) as { docs: any[] };

  const books: Array<Book> = [];

  //Almacenaremos el número de libros indicado en la llamada.
  let bookCounter = 0;
  for (const {
    author_name,
    cover_i,
    edition_count,
    edition_key,
    first_publish_year,
    first_sentence,
    key,
    number_of_pages_median,
    title,
    ratings_average,
    author_key,
  } of docs) {
    //Almacenamos el primer elemento de los arrays de autores, el id de la edicion y primera frase del libro
    const author = Array.isArray(author_name) ? author_name[0] : author_name;
    const editionKey = Array.isArray(edition_key)
      ? edition_key[0]
      : edition_key;
    const first = Array.isArray(first_sentence)
      ? first_sentence[0]
      : first_sentence;

    //Construimos la URL donde obtendremos la portada del libro
    const cover_url = cover_i
      ? "https://covers.openlibrary.org/b/id/" + cover_i + "-L.jpg"
      : undefined;

    const author_profile =
      "https://openlibrary.org/authors/" + author_key + "/" + author_name;

    const book_profile =
      "https://openlibrary.org/books/" + edition_key + "/" + title;
    books.push(
      new Book(
        author,
        cover_url,
        edition_count,
        editionKey,
        first_publish_year,
        first,
        key,
        number_of_pages_median,
        title,
        ratings_average,
        author_profile,
        book_profile
      )
    );
    bookCounter++;
    if (bookCounter === n) {
      break;
    }
  }
  return books;
};
