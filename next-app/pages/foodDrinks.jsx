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
          <li><a href="/">Home</a></li>
          <li><a href="/promotions">Promotions & Rewards</a></li>
          <li><a href="/profile">Profile</a></li>
        </ul>
      </nav>

      {/* Header Banner */}
      <div className="header-banner">
        <h2>Food and Drinks</h2>
        {/* Red Nav Bar */}
        <div className="food-box">
          <ul className="food-nav">
            <li><a href="#popcorn">Popcorn</a></li>
            <li><a href="#sweets">Sweets</a></li>
            <li><a href="#snacks">Snacks</a></li>
            <li><a href="#entrees">Entrees</a></li>
            <li><a href="#drinks">Drinks</a></li>
          </ul>
        </div>
      </div>

      {/* Content Sections */}
      <div className="content">
        <section id="popcorn" className="flex-container">
          <div className="text-content">
            <h2>Popcorn</h2>
            <p>
              When you think about going to the movies, you can almost smell the popcorn in the air. 
              This buttery movie snack is an essential part of the experience.
            </p>
            <p>
              Enjoy the moviegoing go-to you’ve always loved, or mix it up with Cheetos Popcorn for a cheesy twist on the classic.
            </p>
          </div>
          <img src="/images/popcorn.jpg" alt="Popcorn" className="circular-image" />
        </section>

        <section id="sweets" className="flex-container sweets-layout">
          <img src="/images/sweets.jpg" alt="Sweets" className="circular-image" />
          <div className="text-content">
            <h2>Sweets</h2>
            <p>
              Whether you prefer eating candy on its own or mixing it into your
              popcorn, we have a wide selection of sweets to choose from. Get chocolate
              candy like M&Ms, fruit-flavored candy like Sour Patch Kids, or enjoy a
              frozen treat like Dibs.
            </p>
          </div>
        </section>

        <section id="snacks" className="flex-container reverse-layout">
          <img src="/images/snacks.jpg" alt="Snacks" className="circular-image" />
          <div className="text-content">
            <h2>Snacks</h2>
            <p>
              Our Concessions menu also features some more substantial snacks. Try hot food items like Famous All-Beef Hot Dogs, crispy mozzarella sticks, or a pile of bacon cheese fries.
            </p>
          </div>
        </section>

        <section id="entrees" className="flex-container">
          <div className="text-content">
            <h2>Entrees</h2>
            <p>
              Select theatres offer an expanded menu with even more food options. At these locations, you can enjoy entrees like burgers, chicken tenders, or a variety of delicious pizzas.
            </p>
          </div>
          <img src="/images/entrees.jpg" alt="Entrees" className="circular-image" />
        </section>

        <section id="drinks" className="flex-container reverse-layout">
          <img src="/images/drinks.jpg" alt="Drinks" className="circular-image" />
          <div className="text-content">
            <h2>Drinks</h2>
            <p>
              All of these snacks deserve the perfect drink to complement them. Every Regal has Pepsi fountain drinks, Icees, and LIFEWTR. Select locations offer coffee from Lavazza or boba tea from B-Fresh. And Regal’s bar locations have a full menu of alcoholic beverages.
            </p>
          </div>
        </section>
      </div>

      {/* CSS Styles */}
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
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .navbar ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
        }

        .navbar ul li {
          margin: 0 15px;
        }

        .navbar ul li a {
          color: white;
          text-decoration: none;
          font-weight: bold;
          padding: 5px 10px;
          border-radius: 5px;
          transition: background-color 0.3s ease;
        }

        .navbar ul li a:hover {
          background-color: rgba(255, 255, 255, 0.2);
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

        .header-banner {
          background-image: url("/images/food_drinks.jpg");
          background-size: cover;
          background-position: center;
          height: 290px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: center;
          position: relative;
        }

        .header-banner h2 {
          color: white;
          font-size: 36px;
          text-shadow: 10px 10px 10px rgba(0, 0, 0, 0.7);
          margin: 20px 0;
        }

        .food-box {
          background-color: #711324;
          color: white;
          text-align: center;
          padding: 10px;
          width: 100%;
        }

        .food-nav {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
        }

        .food-nav li {
          margin: 0 15px;
        }

        .food-nav li a {
          color: white;
          text-decoration: none;
          font-weight: bold;
          transition: color 0.3s ease;
        }

        .food-nav li a:hover {
          color: #ffcccb;
        }

        .content {
          padding: 20px;
        }

        section {
          margin-bottom: 50px;
          background: #ffffff;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        section:hover {
          transform: scale(1.03);
          box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.3);
        }

        section h2 {
          font-size: 28px;
          margin-top: 0;
        }

        section p {
          font-size: 16px;
          line-height: 1.5;
        }

        html {
          scroll-behavior: smooth;
        }

        .flex-container {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .flex-container.reverse-layout {
          flex-direction: row-reverse;
        }

        .sweets-layout {
          flex-direction: row;
        }

        .text-content {
          flex: 1;
          text-align: left;
        }

        .circular-image {
          flex: 0 0 auto;
          width: 720px;
          height: 720px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #711324;
        }
      `}</style>
    </>
  );
};

export default Home;
