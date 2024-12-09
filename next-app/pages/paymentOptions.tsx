import Head from "next/head";
import { FormEvent, useState, useEffect }  from "react";
import { useSession } from 'next-auth/react';
import { addPaymentMethod, getTotalCards, getPaymentMethods, handleCardDelete } from "../lib/api_references/payments";
import { getCustomerAccountId } from "../lib/api_references/user";

const paymentOptions = () => {

    const [cardNumber, setCardNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [cards, setCards] = useState<Card[]>([]);

    const {data: session, status} = useSession();

    interface Card {
        id: number;
        cardOwnerId: number;
        cardNumberLastFour: string;
        expirationDate: string;
    } 

    useEffect(() => {
        if (status === "authenticated") {
            try {
                onRefresh();
            } catch (err) {
                console.log(err)
                setError('Something went wrong');
            }
        }
    }, [status, session]) 

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

        onRefresh();
      } else {
        setSuccess('')
        setError('Card Could Not Be Deleted')
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