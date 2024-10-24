import Head from "next/head";
<<<<<<< Updated upstream
import { useState } from 'react';
import emailjs from "@emailjs/browser";
=======
import { useState, AwaitedReactNode, JSXElementConstructor, ReactElement, ReactNode, ReactPortal } from 'react';

>>>>>>> Stashed changes

const CreateCustomer = () => {
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [wantsPromotions, setWantsPromotions] = useState(false);
    const [billingAddress, setBillingAddress] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cvc, setCVC] = useState('');
    const [cardName, setCardName] = useState('');
    const [expiration, setExpiration] = useState('');

<<<<<<< Updated upstream
=======
    const [cardId, setCardId] = useState('');
    const [card1Id, setCard1Id] = useState('');
    const [card1LastFour, setcard1LastFour] = useState('');
    const [card1Expiration, setCard1Expiration] = useState('');
    const [card2Id, setCard2Id] = useState('');
    const [card2LastFour, setcard2LastFour] = useState('');
    const [card2Expiration, setCard2Expiration] = useState('');
    const [card3Id, setCard3Id] = useState('');
    const [card3LastFour, setcard3LastFour] = useState('');
    const [card3Expiration, setCard3Expiration] = useState('');
    const [card4Id, setCard4Id] = useState('');
    const [card4LastFour, setcard4LastFour] = useState('');
    const [card4Expiration, setCard4Expiration] = useState('');

    const populate = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if(!email || !password) {
            setError("Email and Password Required");
            return;
          }

        fetch('./api/returnCustomer', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password}),
        })
        .then(isValidRes => isValidRes.json())
        .then((data) => {
        const isValid = data.response;
        if (isValid) {
        fetch('./api/getId', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email}),
        })
        .then(id => id.json())
        .then((data) => {
            fetchCustomerData(data.response);
            getPaymentMethods();
        })
        } else {
            setError('Invalid email or password')
        }
        })
    }

    const fetchCustomerData = async (num: number) => {

        try {
            const response = await fetch('/api/getCustomerData', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id: num})
            })
            .then(res => res.json())
            .then((data) => {
            
            // Set the state with the retrieved data
            console.log({data});
            setFirstName(data.response.first_name);
            setLastName(data.response.last_name);
            setBillingAddress(data.response.billing_address);
            setWantsPromotions(data.response.wants_promotions);
        })} catch (err) {
            console.error(err);
            setError('Failed to load customer data.');
        }
    };

>>>>>>> Stashed changes
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if(!firstName || !lastName || !password) {
            setError("All fields required");
            return;
          }

<<<<<<< Updated upstream
        const customerData = {
            password,
            firstName,
            lastName,
            wantsPromotions,
            address,
            cardNumber,
            cvc,
            cardName,
            expiration
        };

        try {
            const response = await fetch('./api/profileTest', {
=======
        try {
            fetch('./api/returnCustomer', {
>>>>>>> Stashed changes
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
<<<<<<< Updated upstream
                body: JSON.stringify(customerData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            setSuccess('sucess');
=======
                body: JSON.stringify({email, password}),
            })
            .then(isValidRes => isValidRes.json())
            .then((data) => {
                console.log(data.response);
                const isValid = data.response;


            fetch('./api/getId', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email}),
            })
            .then(id => id.json())
            .then((data) => {
                fetch('./api/changeCustomerData', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id: data.response, firstName, lastName, wantsPromotions}),
            });
                if (newPassword != '' && isValid) {
                    fetch('./api/resetPassword', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({id: data.response, newPassword}),
                    });
                } else if (!isValid) {
                    setError('Please enter your email and password');
                }
        })
    })
            setSuccess('success');
>>>>>>> Stashed changes
        } catch (err) {
            setError(String(err));
        }
    };

    const getPaymentMethods = async () => {

            fetch('./api/getId', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        })
            .then(id => id.json())
            .then((data) => {
                fetch('./api/getPaymentMethods', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: data.response }),
                })
                    .then(res => res.json())
                    .then((data) => {
                        const res = data.response;

                        setCard1Id(res[0].cardOwnerId);
                        setcard1LastFour(res[0].cardNumberLastFour);
                        setCard1Expiration(res[0].expirationDate);
                        setCard2Id(res[1].cardOwnerId);
                        setcard2LastFour(res[1].cardNumberLastFour);
                        setCard2Expiration(res[1].expirationDate);
                        setCard3Id(res[2].cardOwnerId);
                        setcard3LastFour(res[2].cardNumberLastFour);
                        setCard3Expiration(res[2].expirationDate);
                        setCard4Id(res[3].cardOwnerId);
                        setcard4LastFour(res[3].cardNumberLastFour);
                        setCard4Expiration(res[3].expirationDate);
                    });
            });
        }

    const editPayments = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if ((cardId == String(1) || cardId == String(2) || cardId == String(3) || cardId == String(4))) {
            setError('Please edit cards 1-4');
        }

        try {
            fetch('./api/getId', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email}),
            })
            .then(id => id.json())
            .then((iddata) => {
                fetch('./api/getTotalCards', {
                    method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({id: iddata.response}),
                    })
                    .then(id => id.json())
                    .then((data) => {
                        const cardCount = data.response;
                        if (cardCount <= 4) {
            fetch('./api/addPaymentMethods', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({accountId: iddata.response, cardNumber, billingAddress, expirationDate: expiration})
            })
            .then(res => res.json())
            .then((data) => {
                console.log(data.response);
            })} else {
                fetch('./api/editPayment', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({cardId: Number(cardId), billingAddress, expirationDate: expiration})
                })
                getPaymentMethods();
            }
        })
        })
        getPaymentMethods();
        } catch (err) {
            console.error(err);
            setError(String(err));
        }
    } 

    console.log(billingAddress);
    console.log(cardId);
// for saved payment cards just display the last 4 digits of the card number
    return (
        <>
        <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Edit Profile</title>
        </Head>
        <div className ="container">
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
<<<<<<< Updated upstream
=======
                <button type="submit">Populate</button>
                </form>
            </div>
            <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    
                />
>>>>>>> Stashed changes
                <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Billing Address"
                    value={billingAddress}
                    onChange={(e) => setBillingAddress(e.target.value)}
                    
                />
                <label>
                    <input
                        type="checkbox"
                        checked={wantsPromotions}
                        onChange={(e) => setWantsPromotions(e.target.checked)}
                    />
                    Wants Promotions
                </label>
<<<<<<< Updated upstream
                <label>
                    <input type="text" placeholder="Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
                    <input type="text" placeholder="Name on Card" value={cardName} onChange={(e) => setCardName(e.target.value)} />
                    <input type="text" placeholder="CVC" value={cvc} onChange={(e) => setCVC(e.target.value)} />
                    <input type="text" placeholder="expiration" value={expiration} onChange={(e) => setExpiration(e.target.value)} />
                    Payment Card 1
                </label>
                <label>
                    <input type="text" placeholder="Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
                    <input type="text" placeholder="Name on Card" value={cardName} onChange={(e) => setCardName(e.target.value)} />
                    <input type="text" placeholder="CVC" value={cvc} onChange={(e) => setCVC(e.target.value)} />
                    <input type="text" placeholder="expiration" value={expiration} onChange={(e) => setExpiration(e.target.value)} />
                    Payment Card 2
                </label>
                <label>
                    <input type="text" placeholder="Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
                    <input type="text" placeholder="Name on Card" value={cardName} onChange={(e) => setCardName(e.target.value)} />
                    <input type="text" placeholder="CVC" value={cvc} onChange={(e) => setCVC(e.target.value)} />
                    <input type="text" placeholder="expiration" value={expiration} onChange={(e) => setExpiration(e.target.value)} />
                    Payment Card 3
                </label>
                <button type="submit">Save Edits</button>
            </form>
=======
                <button type="submit">Save Changes</button>
                </form>
                </div>
                <form onSubmit={editPayments}>
                <label>
                    <input type="text" placeholder='Card ID' value={cardId} onChange={(e) => setCardId(e.target.value)} />
                    <input type="text" placeholder="Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
                    <input type="text" placeholder="Name on Card" value={cardName} onChange={(e) => setCardName(e.target.value)} />
                    <input type="text" placeholder="CVC" value={cvc} onChange={(e) => setCVC(e.target.value)} />
                    <input type="Date" placeholder="expiration" value={expiration} onChange={(e) => setExpiration(e.target.value)} />
                </label>
                <button type="submit">Save Card</button>
                </form>
                <div>
                <div>
      <h2>My Payment Methods</h2>
      <div>
        <h2> Card 1 </h2>
        <input type="text" placeholder="Card Number" value={card1Id} onChange={(e) => setCard1Id(e.target.value)} />
        <input type="text" placeholder="Card last Four #" value={card1LastFour} onChange={(e) => setcard1LastFour(e.target.value)} />
        <input type="String" placeholder="expiration" value={card1Expiration} onChange={(e) => setCard1Expiration(e.target.value)} />
        <h2> Card 2 </h2>
        <input type="text" placeholder="Card Number" value={card2Id} onChange={(e) => setCard2Id(e.target.value)} />
        <input type="text" placeholder="Card last Four #" value={card2LastFour} onChange={(e) => setcard2LastFour(e.target.value)} />
        <input type="String" placeholder="expiration" value={card2Expiration} onChange={(e) => setCard2Expiration(e.target.value)} />
        <h2> Card 3 </h2>
        <input type="text" placeholder="Card Number" value={card3Id} onChange={(e) => setCard3Id(e.target.value)} />
        <input type="text" placeholder="Card last Four #" value={card3LastFour} onChange={(e) => setcard3LastFour(e.target.value)} />
        <input type="String" placeholder="expiration" value={card3Expiration} onChange={(e) => setCard3Expiration(e.target.value)} />
        <h2> Card 4 </h2>
        <input type="text" placeholder="Card Number" value={card4Id} onChange={(e) => setCard4Id(e.target.value)} />
        <input type="text" placeholder="Card last Four #" value={card4LastFour} onChange={(e) => setcard4LastFour(e.target.value)} />
        <input type="String" placeholder="expiration" value={card4Expiration} onChange={(e) => setCard4Expiration(e.target.value)} />
      </div>
    </div>
                </div>
>>>>>>> Stashed changes
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
        </>
    );
};

export default CreateCustomer;