import { useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const getUniqueGenres = (books) => {
  let uniqueGenres = new Set();

  books.forEach((book) => {
    book.genres.forEach((genre) => {
      uniqueGenres.add(genre);
    });
  });

  return Array.from(uniqueGenres);
};

const Books = ({ show }) => {
  const result = useQuery(ALL_BOOKS);
  const [selectedGenre, setSelectedGenre] = useState(null);

  if (result.loading) {
    return <div>loading...</div>;
  }

  if (!show) {
    return null;
  }

  const books = result.data.allBooks;
  const genres = getUniqueGenres(books);

  const filterBooks = (books) => {
    if (!selectedGenre) return books;

    return books.filter((book) => book.genres.includes(selectedGenre));
  };

  return (
    <div>
      <h2>books</h2>

      <div>
        {selectedGenre ? (
          <p>
            in genre <strong>{selectedGenre}</strong>
          </p>
        ) : null}
      </div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filterBooks(books).map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map((genre) => (
          <button key={genre} onClick={() => setSelectedGenre(genre)}>
            {genre}
          </button>
        ))}
        <button onClick={() => setSelectedGenre(null)}>all genres</button>
      </div>
    </div>
  );
};

export default Books;
