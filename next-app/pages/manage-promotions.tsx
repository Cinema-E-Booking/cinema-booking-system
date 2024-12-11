import Head from "next/head";
import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";

// Define the type for promotions
interface Promotion {
    code: string;
    promoDesc: string;
    percent_off: string;
    startDate: string;
    endTime: string;
}

const ManagePromotions = () => {
    const [promoTitle, setPromoTitle] = useState('');
    const [promoDesc, setPromoDesc] = useState('');
    const [discount, setDiscount] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [promotions, setPromotions] = useState<Promotion[]>([]); // Set the correct type for promotions
    const { data: session, status } = useSession();

    useEffect(() => {
        fetchPromotions();
    }, [session, status]);

    const fetchPromotions = async () => {
        try {
            const response = await fetch("/api/allPromotions");
            const result = await response.json();

            if (result.data && Array.isArray(result.data)) {
                console.log("Promotions: ",result.data)
                setPromotions(result.data);
                setSuccess("Promotions loaded");
            } else {
                setError("Failed to load promotions.");
            }
        } catch (error) {
            setError("An error occurred while fetching promotions.");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!promoTitle || !promoDesc || !discount || !startDate || !endDate) {
            setError("All fields are required");
            return;
        }

        const newPromotion: Promotion = {
            code: promoTitle,
            promoDesc,
            percent_off: discount,
            startDate,
            endTime: endDate,
        };

        try {
            const response = await fetch('/api/newPromotion', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({code: newPromotion.code, percentOff: newPromotion.percent_off, endTime: newPromotion.endTime}),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            setSuccess('Promotion created successfully!');
            // Update promotions list after adding
            setPromotions(prevPromotions => [...prevPromotions, newPromotion]);
        } catch (err) {
            setError("Could not create promotion");
        }
    };

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Manage Promotions</title>
            </Head>
            <header className="navbar">
                <div className="brand">
                    <img src="/images/logo.jpg" alt="Cinema Logo" />
                </div>
                <div className="center-title">Manage Promotions</div>
            </header>
            <main>
                {/* Add Promotion Form */}
                <form onSubmit={handleSubmit}>
                    <label htmlFor="promo-title">Promotion Title:</label>
                    <input 
                        type="text" 
                        id="promo-title" 
                        title="Promotion Title"
                        placeholder="Enter promotion title"
                        value={promoTitle} 
                        onChange={(e) => setPromoTitle(e.target.value)} 
                        required 
                    />

                    <label htmlFor="promo-desc">Promotion Description:</label>
                    <textarea 
                        id="promo-desc" 
                        title="Promotion Description"
                        placeholder="Enter promotion description"
                        value={promoDesc} 
                        onChange={(e) => setPromoDesc(e.target.value)} 
                        required 
                    />

                    <label htmlFor="promo-discount">Discount Percentage:</label>
                    <input 
                        type="number" 
                        id="promo-discount" 
                        title="Discount Percentage"
                        placeholder="Enter discount percentage"
                        value={discount} 
                        onChange={(e) => setDiscount(e.target.value)} 
                        required 
                    />

                    <label htmlFor="promo-start">Start Date:</label>
                    <input 
                        type="date" 
                        id="promo-start" 
                        title="Start Date"
                        value={startDate} 
                        onChange={(e) => setStartDate(e.target.value)} 
                        required 
                    />

                    <label htmlFor="promo-end">End Date:</label>
                    <input 
                        type="date" 
                        id="promo-end" 
                        title="End Date"
                        value={endDate} 
                        onChange={(e) => setEndDate(e.target.value)} 
                        required 
                    />

                    <button type="submit">Add Promotion</button>
                </form>

                {/* Existing Promotions */}
                <h2>Existing Promotions</h2>
                {promotions.length > 0 ? (
                    promotions.map((promotion, index) => (
                        <div className="promo-card" key={index}>
    <img src="/images/promo.jpg" alt="Promo Image" />
    <div className="promo-info">
        <h3>{promotion.code}</h3>
        <p>
            <strong>
                End Date: {(() => {
                    const endTime = new Date(promotion.endTime); // Assuming 'promotion.endDate' holds the actual end date.
                    return endTime.toLocaleString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    });
                })()}
            </strong>
        </p>
        <div className="actions">
            <button>Edit</button>
            <button>Delete</button>
        </div>
    </div>
</div>

                    ))
                ) : (
                    <p>No promotions available.</p>
                )}

            </main>
            <footer>
                <p>&copy; 2024 Cinema E-Booking - Admin Panel</p>
            </footer>

            <style jsx>{`
                @font-face {
                  font-family: 'Chom Extra Bold';
                  src: url('/fonts/ChomExtraBold.ttf') format('truetype');
              }

              body {
                  font-family: 'Roboto', Arial, sans-serif;
                  background-color: #f5f5f5;
                  color: #333;
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
                  width: 80px;
                  height: auto;
                  margin-right: 10px;
              }

              .center-title {
                  flex-grow: 1;
                  text-align: center;
                  font-size: 24px;
                  font-weight: bold;
              }

              main {
                  padding: 30px;
                  max-width: 800px;
                  margin: auto;
              }

              form {
                  background-color: #ffffff;
                  padding: 20px;
                  border-radius: 8px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                  margin-bottom: 30px;
              }

              form label {
                  display: block;
                  margin: 15px 0 5px;
                  font-weight: bold;
                  color: #555;
              }

              form input[type="text"],
              form input[type="number"],
              form input[type="date"],
              form textarea {
                  width: 100%;
                  padding: 10px;
                  margin-bottom: 15px;
                  border-radius: 5px;
                  border: 1px solid #ccc;
              }

              form button {
                  background-color: #002b5c;
                  color: #ffffff;
                  padding: 10px 20px;
                  border: none;
                  border-radius: 5px;
                  cursor: pointer;
                  font-size: 1rem;
                  transition: background-color 0.3s;
              }

              form button:hover {
                  background-color: #001f43;
              }

              .promo-card {
                  display: flex;
                  align-items: center;
                  background-color: #ffffff;
                  border-radius: 8px;
                  padding: 20px;
                  margin-bottom: 20px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }

              .promo-card img {
                  width: 100px;
                  height: 100px;
                  border-radius: 8px;
                  margin-right: 20px;
              }

              .promo-info {
                  display: flex;
                  flex-direction: column;
              }

              .promo-info h3 {
                  color: #333;
                  margin: 0;
              }

              .promo-info p {
                  color: #666;
                  margin: 5px 0;
              }

              .actions {
                  margin-top: 10px;
              }

              .promo-info button {
                  background-color: #002b5c;
                  color: #ffffff;
                  border: none;
                  padding: 10px;
                  border-radius: 5px;
                  cursor: pointer;
                  font-size: 1rem;
                  transition: background-color 0.3s;
                  margin-right: 10px;
              }

              .promo-info button:hover {
                  background-color: #001f43;
              }

              footer {
                  text-align: center;
                  padding: 15px;
                  background-color: #002b5c;
                  color: #ffffff;
                  margin-top: 30px;
              }
          `}</style>
      </>
  );
};

export default ManagePromotions;
