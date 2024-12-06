import Head from "next/head";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import styles from "@/styles/Profile.module.css"; // Import CSS module

interface UserProfile {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    address: string;
    promotions: string;
    paymentCards: string[];
}

const Profile: React.FC = () => {
    const [user, setUser] = useState<UserProfile | null>(null);

    useEffect(() => {
        // Placeholder data for development
        const placeholderData: UserProfile = {
            email: "example@example.com",
            firstName: "John",
            lastName: "Doe",
            password: "hashed-password",
            address: "123 Main St, City, State",
            promotions: "Subscribed",
            paymentCards: ["1234123412341234", "5678567856785678", "9012901290129012"],
        };
        setUser(placeholderData); // Simulate fetching data
    }, []);

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Profile</title>
            </Head>
            <div className={styles.profileContainer}>
                <h2 className={styles.profileTitle}>Welcome to Your Profile!</h2>
                <div className={styles.profileDetails}>
                    <div className={styles.detailItem}>
                        <strong>Email:</strong> {user.email}
                    </div>
                    <div className={styles.detailItem}>
                        <strong>First Name:</strong> {user.firstName}
                    </div>
                    <div className={styles.detailItem}>
                        <strong>Last Name:</strong> {user.lastName}
                    </div>
                    <div className={styles.detailItem}>
                        <strong>Password:</strong> ••••••••
                    </div>
                    <div className={styles.detailItem}>
                        <strong>Address:</strong> {user.address}
                    </div>
                    <div className={styles.detailItem}>
                        <strong>Promotions:</strong> {user.promotions}
                    </div>
                    {user.paymentCards.map((card, index) => (
                        <div className={styles.detailItem} key={index}>
                            <strong>Payment Card {index + 1}:</strong> **** **** **** {card.slice(-4)}
                        </div>
                    ))}
                </div>
                <div className={styles.profileActions}>
                    <Link href="/editProfile">
                        <a className={styles.actionLink}>Edit Profile</a>
                    </Link>
                    <Link href="/login">
                        <a className={styles.actionLink}>Logout</a>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Profile;
