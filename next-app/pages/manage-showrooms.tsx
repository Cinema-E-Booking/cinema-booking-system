import Head from "next/head";
import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";

// Define the type for Showrooms

interface Showroom {
    id: number;
    name: string,
    seats: {
        row: number;
        number: number;
    }[]
};

const ManageShowrooms = () => {
    const [name, setName] = useState('');
    const [seats, setSeats] = useState('');
    const [showrooms, setShowrooms] = useState<Showroom[]>([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { data: session, status } = useSession();

    useEffect(() => {
        fetchAuditoriums();
    }, [session, status]);

    const fetchAuditoriums = async () => {
        try {
            const response = await fetch('./api/getAllAuditoriumId', {
                method: 'POST',
                body: JSON.stringify({
                }),
                headers: { 'Content-Type': 'application/json' },
              });
            const auditIdData = await response.json();
            const auditData = auditIdData.data;
            setShowrooms([]);
            const showroomsTemp = [];
            for (let i = 0; i < auditData.length; i++)
            {
                const room = await getAuditorium(auditData[i].id);
                showroomsTemp.push({
                    id: room.id,
                    name: room.name,
                    seats: room.seats,
                });
                //console.log('room', room);
                //console.log('Showrooms: ', showrooms)
            }

            setShowrooms(showroomsTemp);

        } catch (err) {
            console.log (err)
            setError('something went wrong');
        }
    }

    const getAuditorium = async (id: number) => {
        const auditResponse = await fetch('./api/getAuditorium', {
            method: 'POST',
            body: JSON.stringify({
                id: id,
            }),
            headers: { 'Content-Type': 'application/json' },
          });
          const auditoriumData = await auditResponse.json();
          const auditorium = auditoriumData.data;

          //console.log('auditorium: ', auditorium)

          return auditorium;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!name) {
            setError("All fields are required");
            return;
        }

        try {
            createShowRoom();
        } catch (err) {
            console.log(err)
        }
    };

    const createShowRoom = async () => {
        const response = await fetch('./api/newShowroom', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: name, seats: [
                {row: 1, number: 1},
                {row: 1, number: 2},
                {row: 1, number: 3},
                {row: 1, number: 4},
                {row: 1, number: 5},
                {row: 1, number: 6},
                {row: 2, number: 1},
                {row: 2, number: 2},
                {row: 2, number: 3},
                {row: 2, number: 4},
                {row: 2, number: 5},
                {row: 2, number: 6},
                {row: 3, number: 1},
                {row: 3, number: 2},
                {row: 3, number: 3},
                {row: 3, number: 4},
                {row: 3, number: 5},
                {row: 3, number: 6},
                {row: 4, number: 1},
                {row: 4, number: 2},
                {row: 4, number: 3},
                {row: 4, number: 4},
                {row: 4, number: 5},
                {row: 4, number: 6},
                {row: 5, number: 1},
                {row: 5, number: 2},
                {row: 5, number: 3},
                {row: 5, number: 4},
                {row: 5, number: 5},
                {row: 5, number: 6},
                {row: 6, number: 1},
                {row: 6, number: 2},
                {row: 6, number: 3},
                {row: 6, number: 4},
                {row: 6, number: 5},
                {row: 6, number: 6},
            ]}),
        })

        fetchAuditoriums();
    }

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Manage Showrooms</title>
            </Head>
            <header className="navbar">
                <div className="brand">
                    <img src="/images/logo.jpg" alt="Cinema Logo" />
                </div>
                <div className="center-title">Manage Showrooms</div>
                <a href="admin" style={{ color: "#fff", textDecoration: "underline" }}>
          Admin Home
        </a>
            </header>
            <main>
                {/* Add Showroom Form */}
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">ShowRoom Name:</label>
                    <input 
                        type="text" 
                        id="showroom-name" 
                        title="Showroom Name"
                        placeholder="Enter Showroom Name"
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                    <button type="submit">Add Showroom</button>
                </form>

                {/* Existing Showrooms */}
                <h2>Existing Showrooms</h2>
                {showrooms.length > 0 ? (
                    showrooms.map((showroom, index) => (
                        <div className="promo-card" key={index}>
    <div className="promo-info">
        <h3>{showroom.name}</h3>
        <p> Showroom ID: {showroom.id}</p>
        <div className="actions">
            <button>Edit</button>
            <button>Delete</button>
        </div>
    </div>
    {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
</div>

                    ))
                ) : (
                    <p>No Showrooms available.</p>
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

export default ManageShowrooms;
