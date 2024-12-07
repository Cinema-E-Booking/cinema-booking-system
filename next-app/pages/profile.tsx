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
            email: "alexarawles@gmail.com",
            firstName: "Alexa",
            lastName: "Rawles",
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
                <div className={styles.banner}></div>
                <div className={styles.profileHeader}>
                    <img src="/images/avatar.jpg" alt="User Avatar" className={styles.avatar} />
                    <div>
                        <h2 className={styles.name}>{user.firstName} {user.lastName}</h2>
                        <p className={styles.email}>{user.email}</p>
                    </div>
                    <Link href="/editProfile">
                        <a className={styles.editButton}>Edit</a>
                    </Link>
                </div>

                <div className={styles.formSection}>
                    <div className={styles.inputGroup}>
                        <label>Full Name</label>
                        <input type="text" value={`${user.firstName} ${user.lastName}`} readOnly />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Nick Name</label>
                        <input type="text" value="Your First Name" readOnly />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Gender</label>
                        <input type="text" value="Your First Name" readOnly />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Country</label>
                        <input type="text" value="Your First Name" readOnly />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Language</label>
                        <input type="text" value="Your First Name" readOnly />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Time Zone</label>
                        <input type="text" value="Your First Name" readOnly />
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
            </div>
        </>
    );
};

export default Profile;
