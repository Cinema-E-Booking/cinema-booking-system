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

      {/* Header Banner */}
      <div className="header-banner">
        <h2>Food and Drinks</h2>
      </div>

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

        .header-banner {
          background-image: url("/images/food_drinks.jpg");
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
      `}</style>
    </>
  );
};

export default Home;
