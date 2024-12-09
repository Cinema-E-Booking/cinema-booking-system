import Head from "next/head";
import Link from "next/link";
import React, { useState, useEffect, ChangeEvent } from "react";
import styles from "@/styles/Profile.module.css"; // Import CSS module

interface UserProfile {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    address: string;
    promotions: string;
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

const countries = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    // Add more countries as needed
];

const languages = [
    { value: 'en', label: 'English' },
    { value: 'fr', label: 'French' },
    // Add more languages as needed
];

const genders = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
];

const timeZones = [
    { value: 'PST', label: 'Pacific Standard Time (PST)' },
    { value: 'MST', label: 'Mountain Standard Time (MST)' },
    { value: 'CST', label: 'Central Standard Time (CST)' },
    { value: 'EST', label: 'Eastern Standard Time (EST)' },
    // Add more time zones as needed
];

const Profile: React.FC = () => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [newRating, setNewRating] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        // Placeholder data for development
        const placeholderData: UserProfile = {
            email: "alexarawles@gmail.com",
            firstName: "Alexa",
            lastName: "Rawles",
            password: "hashed-password",
            address: "123 Main St, City, State",
            promotions: "Subscribed",
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
        setUser(placeholderData); // Simulate fetching data
    }, []);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (user) {
            setUser({ ...user, [name]: value });
        }
    };

    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (user) {
            setUser({ ...user, [name]: value });
        }
    };

    const handleRatingChange = (e: ChangeEvent<HTMLInputElement>, title: string) => {
        const { value } = e.target;
        setNewRating({ ...newRating, [title]: Number(value) });
    };

    const saveRating = (title: string) => {
        if (user) {
            const updatedMovies = user.watchedMovies.map(movie =>
                movie.title === title ? { ...movie, rating: newRating[title] || movie.rating } : movie
            );
            setUser({ ...user, watchedMovies: updatedMovies });
        }
    };

    if (!user) {
        return <p>Loading...</p>;
    }

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
                            src={user.profilePhoto}
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
                            {editMode ? (
                                <input
                                    type="text"
                                    name="firstName"
                                    value={user.firstName}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                user.firstName
                            )}{" "}
                            {editMode ? (
                                <input
                                    type="text"
                                    name="lastName"
                                    value={user.lastName}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                user.lastName
                            )}
                        </h2>
                        <p className={styles.email}>
                            {editMode ? (
                                <input
                                    type="text"
                                    name="email"
                                    value={user.email}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                user.email
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
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={`${user.firstName} ${user.lastName}`}
                            onChange={handleInputChange}
                            readOnly={!editMode}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Payment Methods</label>
                        <ul>
                            {user.paymentCards.map((card, index) => (
                                <li key={index}>
                                    {card}
                                    {editMode && (
                                        <button onClick={() => {}}>
                                            Delete
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                        {editMode && (
                            <div className={styles.addCardSection}>
                                <input
                                    type="text"
                                    value=""
                                    onChange={() => {}}
                                    placeholder="Add new card"
                                />
                                <button onClick={() => {}}>Add Card</button>
                            </div>
                        )}
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Gender</label>
                        <select
                            name="gender"
                            value={user.gender}
                            onChange={handleSelectChange}
                            disabled={!editMode}
                        >
                            {genders.map((gender) => (
                                <option key={gender.value} value={gender.value}>
                                    {gender.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Country</label>
                        <select
                            name="country"
                            value={user.country}
                            onChange={handleSelectChange}
                            disabled={!editMode}
                        >
                            {countries.map((country) => (
                                <option key={country.value} value={country.value}>
                                    {country.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Language</label>
                        <select
                            name="language"
                            value={user.language}
                            onChange={handleSelectChange}
                            disabled={!editMode}
                        >
                            {languages.map((language) => (
                                <option key={language.value} value={language.value}>
                                    {language.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Time Zone</label>
                        <select
                            name="timeZone"
                            value={user.timeZone}
                            onChange={handleSelectChange}
                            disabled={!editMode}
                        >
                            {timeZones.map((timeZone) => (
                                <option key={timeZone.value} value={timeZone.value}>
                                    {timeZone.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className={styles.emailSection}>
                    <h3>My email Address</h3>
                    <div className={styles.emailItem}>
                        <input type="checkbox" checked readOnly />
                        <p>{user.email}</p>
                        <span>1 month ago</span>
                    </div>
                    <button className={styles.addEmailButton}>+ Add Email Address</button>
                </div>

                <div className={styles.moviesSection}>
                    <h3>Watched Movies</h3>
                    {user.watchedMovies.map((movie, index) => (
                        <div key={index} className={`${styles.movieItem} movieItem`}>
                            <p>{movie.title}</p>
                            <div className="star-rating">
                                {[5, 4, 3, 2, 1].map((star) => (
                                    <React.Fragment key={star}>
                                        <input
                                            type="radio"
                                            id={`${movie.title}-${star}`}
                                            name={`${movie.title}-rating`}
                                            value={star}
                                            checked={newRating[movie.title] === star}
                                            onChange={(e) => handleRatingChange(e, movie.title)}
                                        />
                                        <label htmlFor={`${movie.title}-${star}`}>&#9733;</label>
                                    </React.Fragment>
                                ))}
                            </div>
                            <button onClick={() => saveRating(movie.title)}>Save Rating</button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Profile;