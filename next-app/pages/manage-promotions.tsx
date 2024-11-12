import Head from "next/head";
import React, { useState, useEffect } from 'react';

const CreatePromotion = () => {
  const [code, setCode] = useState('');
  const [percentOff, setPercentOff] = useState('');
  const [endTime, setEndTime] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    const fetchPromotions = async () => {
        try {
            const response = await fetch("/api/allPromotions");
            const result = await response.json();

            if (result.data && Array.isArray(result.data.promotions)) {
                setPromotions(result.data.promotions);
                setSuccess("Promotions loaded");
            } else {
                setError("Failed to load promotions.");
            }
        } catch (error) {
            setError("An error occurred while fetching promotions.");
        }
    };

    fetchPromotions();
}, []);

const fetchEmails = async () => {
  try{
      const response = await fetch(`./api/getEmails`);
      const result = await response.json();

      if(response.ok) {
        console.log('emails check:', result);
          //setMovies((prevMovies) => prevMovies.filter((movie) => movie[0] !== id));
          setSuccess("Movie deleted successfully");
      } else {
          const errorData = await response.json();
          setError(errorData.message);
      }
  } catch (error) {
      setError("Error happened while deleting movie");
  }
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if(!code || !percentOff || !endTime) {
        setError("All fields required");
        return;
      }

    const promotionData = {
        code,
        percentOff,
        endTime,
    };

    try {
        const response = await fetch('./api/newPromotion', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(promotionData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        setSuccess('Promotion created successfully!');
    } catch (err) {
        setError(String(err));
    }
};

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Manage Promotions</title>
      </Head>
      <header>
        <a href="/admin"> Admin Home </a>
            <h1>Manage Promotions</h1>
      </header>
        <main>
            <form onSubmit={handleSubmit}>
            <label htmlFor="promo-code">Promotion Code:</label>
            <input type="text" placeholder="promo-code" value={code} onChange={(e) => setCode(e.target.value)} required />
            <label htmlFor="promo-discount">Discount Percentage:</label>
            <input type="number" placeholder="promo-discount" value={percentOff} onChange={(e) => setPercentOff(e.target.value)} required />
            <label htmlFor="promo-end">End Date:</label>
            <input type="date" placeholder="date" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
            <button type="submit">Add Promotion</button>
            </form>
            <h2>Existing Promotions</h2>
            <table>
              <thead>
                <tr>
                  <th>Promo Code</th>
                  <th>Discount</th>
                  <th>End Dates</th>
                  <th>Actions</th>
                </tr>
              </thead>
            <tbody>
              {promotions.map((promotion, index) => (
                <tr key={index}>
                  <td>{promotion[0]}</td>
                  <td>{promotion[1]}</td>
                  <td>{promotion[2]}</td>
                  <td>
                    <button>Delete</button>
                    <button onClick={() => fetchEmails()}>Send Promotion</button>
                  </td>
                </tr>
              ))}
            </tbody>
            </table>
        </main>
        {error && <p style={{ color: 'red'}}>{error}</p>}
        {success && <p style={{ color: 'green'}}>{success}</p>}
        <footer>
            <p>© 2024 Cinema E-Booking - Manage Promotions</p>
        </footer>
    </>
  );
};

export default CreatePromotion;