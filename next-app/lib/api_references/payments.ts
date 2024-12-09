interface Card {
    id: number;
    cardOwnerId: number;
    cardNumberLastFour: string;
    expirationDate: string;
  } 

export async function addPaymentMethod (userId: number|undefined, cardNumber: string, expirationDate: string) {
    try {
        const response = await fetch('./api/addPaymentMethods', {
            method: 'POST',
            body: JSON.stringify({
              accountId: Number(userId),
              cardNumber,
              expirationDate,
            }),
            headers: { 'Content-Type': 'application/json' },
          });
        return true;
    } catch (err) {

    }

    return null;
}

export async function getTotalCards (userId: number|undefined) {
    try {
        const cardRes= await fetch('./api/getTotalCards', {
            method: 'POST',
            body: JSON.stringify({
              id: userId,
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        const cardNumberData = await cardRes.json();
        const cardTotal = await cardNumberData.response;

        return cardTotal;
    } catch (err) {

    }
}

export async function getPaymentMethods (userId: number) {
    try {
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
        
        return cardsDataArray;
    } catch (err) {

    }
    return null;
}

export async function handleCardDelete (cardId: number) {
    try {
        await fetch('./api/removePayment', { // Replace with your delete API endpoint
            method: 'DELETE',
            body: JSON.stringify({ cardId: cardId }),
            headers: { 'Content-Type': 'application/json' },
        });

        return true;
    } catch (err) {
        console.log(err)
    }

    return null;
}