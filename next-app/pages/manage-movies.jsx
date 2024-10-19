import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Manage Movies</title>
      </Head>
      <header>
            <h1>Manage Movies</h1>
      </header>
        <main>
            <form action="#" method="POST">
            <label htmlFor="movie-title">Movie Title:</label>
            <input type="text" id="movie-title" name="movie-title" required="" />
            <label htmlFor="movie-desc">Movie Description:</label>
            <textarea
                id="movie-desc"
                name="movie-desc"
                required=""
                defaultValue={""}
            />
            <label htmlFor="movie-category">Category:</label>
            <select id="movie-category" name="movie-category" required="">
                <option value="currently-running">Currently Running</option>
                <option value="coming-soon">Coming Soon</option>
            </select>
            <label htmlFor="showtimes">Showtimes (comma-separated):</label>
            <input type="text" id="showtimes" name="showtimes" required="" />
            <label htmlFor="trailer-link">Trailer Link (YouTube):</label>
            <input type="url" id="trailer-link" name="trailer-link" required="" />
            <button type="submit">Add Movie</button>
            </form>
            <h2>Existing Movies</h2>
            <table>
            <tbody>
                <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Category</th>
                <th>Showtimes</th>
                <th>Actions</th>
                </tr>
                {/* Example of a row (this should be dynamically generated in the real system) */}
                <tr>
                <td>Movie 1</td>
                <td>Action-packed adventure.</td>
                <td>Currently Running</td>
                <td>12:00 PM, 03:00 PM</td>
                <td>
                    <button>Edit</button>
                    <button>Delete</button>
                </td>
                </tr>
            </tbody>
            </table>
        </main>
        <footer>
            <p>© 2024 Cinema E-Booking - Admin Panel</p>
        </footer>
    </>
  );
}