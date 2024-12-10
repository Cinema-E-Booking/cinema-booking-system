import Head from "next/head";
import Link from "next/link";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import styles from "@/styles/Profile.module.css"; // Import CSS module
import { returnUserId, getCustomerData, changeCustomerData } from "../lib/api_references/user"
import { useSession } from "next-auth/react";
import { getPaymentMethods, handleCardDelete, getTotalCards, addPaymentMethod } from "../lib/api_references/payments"
import{ getCustomerAccountId } from "../lib/api_references/user"

interface UserProfile {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    billingAddress: string;
    wantsPromotions: boolean;
    paymentCards: string[];
    watchedMovies: WatchedMovie[];
    country: string;
    gender: string;
    language: string;
    profilePhoto: string;
    timeZone: string;
}

interface WatchedMovie {
    title: string;
    rating: number;
}

interface Card {
    id: number;
    cardOwnerId: number;
    cardNumberLastFour: string;
    expirationDate: string;
} 

const Profile: React.FC = () => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [newRating, setNewRating] = useState<{ [key: string]: number }>({});
    const {data: session, status} = useSession();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [wantsPromotions, setWantsPromotions] = useState(false);
    const [billingAddress, setBillingAddress] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [cards, setCards] = useState<Card[]>([]);
    const [cardNumber, setCardNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');

    // Placeholder data for development
    const placeholderData: UserProfile = {
        email: "alexarawles@gmail.com",
        firstName: "Alexa",
        lastName: "Rawles",
        password: "hashed-password",
        billingAddress: "123 Main St, City, State",
        wantsPromotions: true,
        paymentCards: ["1234123412341234", "5678567856785678", "9012901290129012"],
        watchedMovies: [
            { title: "Inception", rating: 4 },
            { title: "Titanic", rating: 5 },
        ],
        country: "us",
        gender: "female",
        language: "en",
        profilePhoto: "/images/avatar.jpg",
        timeZone: "PST"
    };
    useEffect(() => {
        setUser(placeholderData); // Simulate fetching data
        updateData(session?.user?.email);
        populateCards();
    }, [session, status]);

    const updateData = async (email: any) => {
        const id = await returnUserId(email);
        const data = await getCustomerData(id);
        setUser(data);
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setBillingAddress(data.billing_address);
        setWantsPromotions(data.wants_promotions);
    }

    const handleSelectChange = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const id = await returnUserId(session?.user?.email);
        const changedEffectively = await changeCustomerData(id, firstName, lastName, wantsPromotions, billingAddress)
        if (changedEffectively) {
            setError('')
            setSuccess('Data Changed Succesfully')
        } else {
            setSuccess('')
            setError('Data was not able to be changed')
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!cardNumber || !expirationDate) {
            setSuccess('')
            setError('Please fill out all the fields')
        }

        try {

            const userId = await getCustomerAccountId(session?.user?.email)

            const cardTotal = await getTotalCards(userId);

            if (cardTotal < 4) {
            const response = await addPaymentMethod(userId, cardNumber, expirationDate)

              setError('')
              setSuccess('Card added succesfully')
              populateCards();
            } else {
                setSuccess('')
                setError('You have too many cards, please remove one.')
                return null;
            }
        } catch (err) {
            console.log(err);
            setError('Something went wrong.')
        }
    }

    const handleRatingChange = (e: ChangeEvent<HTMLInputElement>, title: string) => {
        const { value } = e.target;
        setNewRating({ ...newRating, [title]: Number(value) });
    };

    const populateCards = async () => {
        try {
          const userId = await getCustomerAccountId(session?.user?.email)

            const cardsDataArray = await getPaymentMethods(userId);
          if (cardsDataArray != null) {
              setCards(cardsDataArray);
          }   
        } catch (err) {
            console.log(err);
            setSuccess('')
            setError('Something went wrong')
        }
    }

    const handleDelete = async (cardId: number) => {
        const response = await handleCardDelete(cardId)
        if (response) {
          setError('')
          setSuccess('Card Deleted Succesfully')
  
          populateCards();
        } else {
          setSuccess('')
          setError('Card Could Not Be Deleted')
        }
    }

    const saveRating = (title: string) => {
        if (user) {
            const updatedMovies = user.watchedMovies.map(movie =>
                movie.title === title ? { ...movie, rating: newRating[title] || movie.rating } : movie
            );
            setUser({ ...user, watchedMovies: updatedMovies });
        }
    };

    /*if (!user) {
        return <p>Loading...</p>;
    }*/

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Profile</title>
            </Head>

            <style jsx global>{`
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
                    background-color: rgba(255, 255, 255, 0.2); /* Light transparent hover effect */
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

                .star-rating {
                    display: flex;
                    flex-direction: row-reverse;
                    justify-content: center;
                    margin: 10px 0;
                }

                .star-rating input {
                    display: none;
                }

                .star-rating label {
                    font-size: 2rem;
                    color: #ddd;
                    cursor: pointer;
                }

                .star-rating input:checked ~ label,
                .star-rating input:hover ~ label {
                    color: #FFD700;
                }

                .star-rating label:hover,
                .star-rating label:hover ~ label {
                    color: #FFD700;
                }

                .movieItem {
                    margin-bottom: 20px; /* Add more space between movie cards */
                }
            `}</style>

            <nav className="navbar">
                <div className="brand">
                    <img src="/images/logo.jpg" alt="Cinema Logo" />
                    <h1>Cinema E-Booking</h1>
                </div>
                <ul>
                    <li><a href="/foodDrinks">Food & Drinks</a></li>
                    <li><a href="/promotions">Promotions & Rewards</a></li> 
                    <li><a href="/profile">Profile</a></li>
                </ul>
                <div className="search-container">
                    <input
                        type="text"
                        value=""
                        placeholder="Search for a movie..."
                        aria-label="Search for a movie"
                    />
                    <button>Search</button>
                    <select
                        title="Filter movies by rating"
                    >
                        <option value="all">All Ratings</option>
                        <option value="G">G</option>
                        <option value="PG">PG</option>
                        <option value="PG-13">PG-13</option>
                        <option value="R">R</option>
                    </select>
                </div>
            </nav>

            <div className={styles.profileContainer}>
                <div className={styles.banner}></div>
                <div className={styles.profileHeader}>
                    <label htmlFor="profilePhoto">
                        <img
                            src={"/images/logo.jpg"}
                            alt="User Avatar"
                            className={styles.avatar}
                        />
                        {editMode && (
                            <input
                                type="file"
                                id="profilePhoto"
                                onChange={() => {}}
                                style={{ display: 'none' }}
                            />
                        )}
                    </label>
                    <div>
                        <h2 className={styles.name}>
                            {(
                                firstName
                            )}{" "}
                            {(
                                lastName
                            )}
                        </h2>
                        <p className={styles.email}>
                            {(
                                user?.email
                            )}
                        </p>
                    </div>
                    <button
                        className={styles.editButton}
                        onClick={() => setEditMode(!editMode)}
                    >
                        {editMode ? "Save" : "Edit"}
                    </button>
                </div>

                <div className={styles.formSection}>
                    <div className={styles.inputGroup}>
                <form onSubmit={handleSelectChange}>
                {editMode ? (
                <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    
                />) : ("")}
                {editMode ? (
                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    
                />) :("")}
                {editMode ? (
                <input
                    type="text"
                    placeholder="Billing Address"
                    value={billingAddress}
                    onChange={(e) => setBillingAddress(e.target.value)}
                    
                />) :("")}
                {editMode ? (
                <label>
                    <p>Wants Promotions</p>
                    <input
                        type="checkbox"
                        checked={wantsPromotions}
                        onChange={(e) => setWantsPromotions(e.target.checked)}
                    />
                </label>) :("")}
                </form>
                <div className={styles.inputGroup}>
                        <label>Payment Methods</label>
                        <ul>
                    {cards.map(card => (
                        <li key={card.id}>
                            Card Number: **** **** **** {card.cardNumberLastFour}, Expiration Date: {card.expirationDate}
                            {editMode ? (
                            <button onClick={() => handleDelete(card.id)}>Delete</button>
                            ) :("")}
                        </li>
                    ))}
             </ul>
                        {editMode && (
                            <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Card Number"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                
                            />
                            <input
                                type="date"
                                placeholder="Expiration Date"
                                value={expirationDate}
                                onChange={(e) => setExpirationDate(e.target.value)}
                                
                            />
                            <button type="submit">Add Payment Option</button>
                            </form>
                        )}
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
                </div>
        </div>

                <div className={styles.emailSection}>
                    <h3>My email Address</h3>
                    <div className={styles.emailItem}>
                        <p>{user?.email}</p>
                    </div>
                </div>

                <div className={styles.moviesSection}>
                    <h3>Watched Movies</h3>
                </div>
            </div>
        </>
    );
};

export default Profile;