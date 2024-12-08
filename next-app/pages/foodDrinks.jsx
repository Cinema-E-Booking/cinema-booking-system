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
        <section id="popcorn">
          <h2>Popcorn</h2>
          <p>
            When you think about going to the movies, you can almost smell the popcorn in the air. 
            This buttery movie snack is an essential part of the experience.
          </p>
        </section>

        <section id="sweets">
          <h2>Sweets</h2>
          <p>Explore a variety of candies and chocolates to satisfy your sweet tooth.</p>
        </section>

        <section id="snacks">
          <h2>Snacks</h2>
          <p>From nachos to pretzels, find your perfect snack to accompany your movie.</p>
        </section>

        <section id="entrees">
          <h2>Entrees</h2>
          <p>Enjoy hearty options like pizzas or burgers while watching your favorite film.</p>
        </section>

        <section id="drinks">
          <h2>Drinks</h2>
          <p>Quench your thirst with sodas, juices, or cocktails tailored to your taste.</p>
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
    flex-direction: horizontal; /* Make the items stack vertically */
    align-items: flex-start; /* Align items to the left */
  }
  
  .navbar ul li {
    margin: 10px 0; /* Add spacing between menu items */
  }
  
  .navbar ul li a {
    color: white; /* Set text color to white */
    text-decoration: none;
    font-weight: bold;
    padding: 5px 10px; /* Add some padding for clickable area */
    border-radius: 5px; /* Optional: make the background rounded */
    transition: background-color 0.3s ease; /* Smooth transition for hover effect */
  }
  
  .navbar ul li a:hover {
    background-color: rgba(255, 255, 255, 0.2); /* Light transparent hover effect */
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
    margin-top: -10px; /* Ensures it overlaps the bottom of the image */
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
    background: #ffffff; /* White background for the shadow box */
    border-radius: 8px; /* Rounded corners */
    padding: 20px; /* Inner padding */
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); /* Shadow effect */
    transition: transform 0.3s ease, box-shadow 0.3s ease; /* Smooth transition effect */
  }

  section:hover {
    transform: scale(1.03); /* Slight zoom on hover */
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.3); /* Deeper shadow on hover */
  }

  section h2 {
    font-size: 28px;
    margin-top: 0; /* Ensure it aligns well within the shadow box */
  }

  section p {
    font-size: 16px;
    line-height: 1.5;
  }

  html {
    scroll-behavior: smooth;
  }
`}</style>

    </>
  );
};

export default Home;
