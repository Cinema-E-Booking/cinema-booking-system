import Head from "next/head";
import React from "react";

const Promotions = () => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Promotions</title>
      </Head>

      <style jsx>{`
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
        }

        .hero {
          background-image: url("/images/promopic.jpg");
          background-size: cover;
          background-position: center;
          height: 300px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.7);
        }

        .hero h2 {
          font-size: 36px;
        }

        .promo-section {
          padding: 40px;
        }

        .promo-item {
          display: flex;
          align-items: center;
          margin-bottom: 40px;
        }

        .promo-item:nth-child(even) {
          flex-direction: row-reverse;
        }

        .promo-item img {
          width: 50%;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .promo-content {
          width: 50%;
          padding: 20px;
        }

        .promo-content h3 {
          font-size: 1.8rem;
          color: #002b5c;
          margin-bottom: 10px;
        }

        .promo-content p {
          font-size: 1rem;
          color: #555;
          margin-bottom: 10px;
        }

        .promo-content span {
          font-weight: bold;
          color: #333;
        }

        footer {
          text-align: center;
          padding: 20px;
          background-color: #002b5c;
          color: white;
        }
      `}</style>

      {/* Navbar */}
      <nav className="navbar">
        <div className="brand">
          <img src="/images/logo.jpg" alt="Cinema Logo" />
          <h1>Cinema E-Booking</h1>
        </div>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/foodDrinks">Food & Drinks</a></li>
          <li><a href="/profile">Profile</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <div className="hero">
        <h2>Promotions</h2>
      </div>

      {/* Promotions Section */}
      <section className="promo-section">
        {/* Promotion 1 */}
        <div className="promo-item">
          <img src="/images/promo.jpg" alt="Snack Saver Combo" />
          <div className="promo-content">
            <h3>Snack Saver Combo</h3>
            <p>Enjoy a large popcorn and soda combo at 20% off every Friday. Treat yourself to your favorite snacks while watching your favorite movies.</p>
            <p><span>Offer valid through:</span> December 31, 2024</p>
          </div>
        </div>

        {/* Promotion 2 */}
        <div className="promo-item">
          <img src="/images/rewards.jpg" alt="Double Rewards" />
          <div className="promo-content">
            <h3>Double Rewards</h3>
            <p>Earn double reward points on movie tickets this weekend! More points mean more perks for your next movie experience.</p>
            <p><span>Offer valid through:</span> January 15, 2025</p>
          </div>
        </div>

        {/* Promotion 3 */}
        <div className="promo-item">
          <img src="/images/movienight.jpg" alt="Family Movie Night" />
          <div className="promo-content">
            <h3>Family Movie Night</h3>
            <p>Buy 3 tickets, get the 4th one free! Make Wednesday nights family movie night and enjoy unforgettable moments together.</p>
            <p><span>Offer valid through:</span> March 31, 2025</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>&copy; 2024 Cinema E-Booking</p>
      </footer>
    </>
  );
};

export default Promotions;