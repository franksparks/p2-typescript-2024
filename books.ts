export class Book {
  constructor(
    public author_name: string, //23
    public cover_edition_key: string, //38
    public cover_i: string, //39
    public edition_count: number, //43
    public first_publish_year: number, //151
    public first_sentence: string, //152
    public key: string, //410
    public lending_identifier_s: number, //451
    public number_of_pages_median: number, //452
    public title: "string", //855
    public ratings_average: number //1167
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
    cover_edition_key,
    cover_i,
    edition_count,
    first_publish_year,
    first_sentence,
    key,
    lending_identifier_s,
    number_of_pages_median,
    title,
    ratings_average,
  } of docs) {
    //Almacenamos el primer elemento de los arrays de autores y primera fras  del libro
    const author = Array.isArray(author_name) ? author_name[0] : author_name;
    const first = Array.isArray(first_sentence)
      ? first_sentence[0]
      : first_sentence;

    //Eliminamos "isbn_" del inicio del id
    const id = lending_identifier_s?.startsWith("isbn_")
      ? lending_identifier_s.substring(5)
      : lending_identifier_s;
    books.push(
      new Book(
        author,
        cover_edition_key,
        cover_i,
        edition_count,
        first_publish_year,
        first,
        key,
        id,
        number_of_pages_median,
        title,
        ratings_average
      )
    );
    bookCounter++;
    if (bookCounter === n) {
      break;
    }
  }
  return books;
};
