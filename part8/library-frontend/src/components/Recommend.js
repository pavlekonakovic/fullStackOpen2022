import { useQuery } from "@apollo/client";
import { ALL_BOOKS, GET_ME } from "../queries";

const Recommend = ({ show }) => {
  const books = useQuery(ALL_BOOKS);
  const user = useQuery(GET_ME)

  if (books.loading || user.loading) {
    return <div>loading...</div>;
  }

  const favouriteGenre =user.data.me?.favouriteGenre
  const { allBooks } = books.data

  console.log('FAVORITE', favouriteGenre)

  

  if (!show) {
    return null;
  }

  return(
    <div>
      <h2>Recommendations</h2>

      <div>
        <p>
          books in your favorite genre <strong>{favouriteGenre}</strong>
        </p>
      </div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {allBooks.filter((book) => book.genres.includes(favouriteGenre)).map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend