import Head from "next/head";
import Script from "next/script";

export default function Home() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Cinema E-Booking</title>
        <Script src="@/public/search.js" defer />
      </Head>
      <header className="header-blue-part">
        <div className="header-content">
          <div className="booking-name">Cinema E-Booking</div>
          <div className="search-bar-container">
            <input
              type="text"
              id="search-bar"
              placeholder="Search for a movie..."
            />
            <select id="genre-dropdown">
              <option value="all">All Genres</option>
              <option value="Action">Action</option>
              <option value="Romance">Romance</option>
              <option value="Comedy">Comedy</option>
              <option value="Animation">Animation</option>
              <option value="Mystery">Mystery</option>
            </select>
            <button id="search-btn" className="btn">
             Search
            </button>
          </div>
        </div>
      </header>
      <main>
        <h2>Now Showing</h2>
        <div id="now-showing" className="movie-grid"></div>
        <h2>Coming Soon</h2>
        <div id="coming-soon" className="movie-grid"></div>
      </main>
      <footer>
        <p>© 2024 Cinema E-Booking</p>
      </footer>
    </>
  );
}
