import Head from "next/head";
import { FormEvent, useState, useEffect }  from "react";
import { useSession } from 'next-auth/react';

const paymentOptions = () => {

    const [cardNumber, setCardNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [cards, setCards] = useState<Card[]>([]);

    const {data: session} = useSession();

    interface Card {
        id: number;
        cardOwnerId: number;
        cardNumberLastFour: string;
        expirationDate: string;
      } 

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!cardNumber || !expirationDate) {
            setSuccess('')
            setError('Please fill out all the fields')
        }

        try {

            const userIdData = await fetch('./api/getId', {
                method: 'POST',
                body: JSON.stringify({
                  email: session?.user?.email,
                }),
                headers: { 'Content-Type': 'application/json' },
              });
            const userData = await userIdData.json();
            const userId = await userData.response;

            const cardRes = await fetch('./api/getTotalCards', {
                method: 'POST',
                body: JSON.stringify({
                  id: userId,
                }),
                headers: { 'Content-Type': 'application/json' },
              });

            const cardNumberData = await cardRes.json();
            const cardTotal = await cardNumberData.response;

            if (cardTotal < 4) {
            const response = await fetch('./api/addPaymentMethods', {
                method: 'POST',
                body: JSON.stringify({
                  accountId: Number(userId),
                  cardNumber,
                  expirationDate,
                }),
                headers: { 'Content-Type': 'application/json' },
              });

              setError('')
              setSuccess('Card added succesfully')
              onRefresh();
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

    const onRefresh = async () => {

        console.log('Page Refreshed!')
        setSuccess('Page Refreshed!')
        try {

            const userIdData = await fetch('./api/getId', {
                method: 'POST',
                body: JSON.stringify({
                  email: session?.user?.email,
                }),
                headers: { 'Content-Type': 'application/json' },
              });
            const userData = await userIdData.json();
            const userId = await userData.response;
            console.log('User ID:', userId);

            const response = await fetch('./api/getPaymentMethods', {
                method: 'POST',
                body: JSON.stringify({
                  accountId: Number(userId),
                }),
                headers: { 'Content-Type': 'application/json' },
              });

            const cardsData = await response.json();
            console.log('CardsData:', cardsData);
            const cardsDataArray = cardsData.response as Card[]; // Cast response to Card[]
            setCards(cardsDataArray);
        
        } catch (err) {
            console.log(err);
            setSuccess('')
            setError('Something went wrong')
        }
        
    }

    const handleDelete = async (cardId: number) => {
        try {
            await fetch('./api/removePayment', { // Replace with your delete API endpoint
                method: 'DELETE',
                body: JSON.stringify({ cardId: cardId }),
                headers: { 'Content-Type': 'application/json' },
            });
            setSuccess('Card deleted successfully');
            onRefresh();
        } catch (err) {
            console.log(err);
            setError('Something went wrong while deleting the card.');
        }
    }

    return (
        <>
        <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Payment Methods</title>
        </Head>
        <div className ="container">
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
            <button onClick={() => onRefresh()}>View Cards</button>
            
            <ul>
            {cards.map(card => (
                        <li key={card.id}>
                            Card Number: **** **** **** {card.cardNumberLastFour}, Expiration Date: {card.expirationDate}
                            <button onClick={() => handleDelete(card.id)}>Delete</button>
                        </li>
            ))}
             </ul>
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </>
    );
}

export default paymentOptions;