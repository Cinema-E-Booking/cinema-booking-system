import Head from "next/head";
import Script from "next/script";

const Home = () => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Cinema E-Booking</title>
        <Script src="@/public/search.js" defer />
      </Head>

      <style jsx global>{`
        body {
          font-family: "Chom Extra Bold", Arial, sans-serif;
          background-color: #fffcfc;
          margin: 0;
          padding: 0;
        }

        .navbar {
          background-color: #002b5c;
          padding: 10px;
          color: white;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: absolute;
          width: 100%;
          top: 0;
          z-index: 10;
        }

        .navbar img {
          width: 60px;
          height: auto;
          margin-right: 10px;
        }

        .navbar .brand {
          display: flex;
          align-items: center;
        }

        .navbar .brand h1 {
          font-size: 24px;
          margin: 0;
          padding-left: 10px;
        }

        .navbar ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
        }

        .navbar ul li {
          margin-right: 20px;
        }

        .navbar ul li a {
          color: white;
          text-decoration: none;
          font-weight: bold;
          transition: border-bottom 0.3s ease;
        }

        .navbar ul li a:hover {
          text-decoration: underline;
        }
        .search-container {
          display: flex;
          align-items: center;
        }

        .search-container input {
          padding: 10px;
          width: 200px;
          font-size: 1rem;
          border-radius: 5px;
          border: 1px solid #ccc;
        }

        .search-container button {
          padding: 10px 20px;
          background-color: #007BFF;
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          margin-left: 10px;
        }

        .search-container select {
          padding: 10px;
          font-size: 1rem;
          border-radius: 5px;
          margin-left: 10px;
        }

        .header-banner {
          background-image: url("/images/banner.jpg");
          background-size: cover;
          background-position: center;
          height: 290px; 
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .header-banner h2 {
          color: white;
          font-size: 36px;
          text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.7);
        }

        .movie-card {
          width: 220px;
          background-color: #fff;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
          text-align: center;
          margin: 20px;
        }

        .movie-slider {
          display: flex;
          justify-content: center;
          gap: 20px;
        }

        .movie-card img {
          width: 100%;
          height: 300px;
          object-fit: cover;
        }

        .movie-card h3 {
          font-size: 1.2rem;
          color: #333;
          margin-bottom: 10px;
        }

        .movie-card p {
          margin-bottom: 10px;
          font-weight: bold;
          color: #666;
        }

        .movie-card button {
          padding: 10px 20px;
          background-color: #002b5c; /* Updated to match the dark blue color scheme */
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          margin-bottom: 20px;
          transition: background-color 0.3s;
        }

        .movie-card button:hover {
          background-color: #001f43;
        }

        .movie-grid {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
        }

        .slider-container {
          position: relative;
        }

        .prev-btn,
        .next-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          font-size: 2rem;
          cursor: pointer;
          color: #fff;
          background-color: #000;
          border-radius: 50%;
          padding: 10px;
          z-index: 5;
        }

        .prev-btn {
          left: -30px;
        }

        .next-btn {
          right: -30px;
        }
      `}</style>

      {/* Navbar */}
      <nav className="navbar">
        <div className="brand">
          <img src="/images/logo.jpg" alt="Cinema Logo" />
          <h1>Cinema E-Booking</h1>
        </div>
        <ul>
          <li><a href="/foodDrinks.tsx">Food & Drinks</a></li>
          <li><a href="/promotions.tsx">Promotions & Rewards</a></li>
          <li><a href="/profile">Profile</a></li>
        </ul>
      </nav>
      
      {/* Other content */}
    </>
  );
};

export default Home;
