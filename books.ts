export class Book {
  constructor(
    public title: "string",
    public author_name: string,
    public publish_date: number,
    public first_publish_year: number,
    public number_of_pages_median: number,
    public cover_i: string
  ) {}
}

export const loadBooks = async (n: number) => {
  const response = await fetch(
    `https://openlibrary.org/search.json?q=ciencia-ficcion`
  );

  const { docs } = (await response.json()) as { docs: any[] };

  const books: Array<Book> = [];
  let bookCounter = 0;
  for (const {
    title,
    author_name,
    first_publish_year,
    number_of_pages_median,
    publish_date,
    cover_i,
  } of docs) {
    books.push(
      new Book(
        title,
        author_name,
        first_publish_year,
        number_of_pages_median,
        publish_date,
        cover_i
      )
    );
    bookCounter++;
    if (bookCounter === n) {
      break;
    }
  }
  return books;
};
