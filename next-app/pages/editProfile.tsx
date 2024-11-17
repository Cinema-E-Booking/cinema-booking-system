import Head from "next/head";
import { FormEvent, useState, useEffect }  from "react";
import { useSession } from "next-auth/react";

const editProfile = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [wantsPromotions, setWantsPromotions] = useState(false);
    const [billingAddress, setBillingAddress] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const {data: session, status} = useSession();

    useEffect(() => {
        if (status === "authenticated") {
            try {
                updateData(session?.user?.email);
            } catch (err) {
                console.log(err)
                setError('Something went wrong');
            }
        }
    }, [status, session])

    const updateData = async (email: any) => {
        const response = await fetch('./api/returnUser', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: session?.user?.email}),
        });
        const userData = await response.json();
        const userId = await userData.response;
        const id = userId.id;

        const customerResponse = await fetch('./api/getCustomerData', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: id}),
        });
        const responseData = await customerResponse.json();
        const customerData = await responseData.response;
        const data = customerData;

        setFirstName(data.first_name);
        setLastName(data.last_name);
        setBillingAddress(data.billing_address);
        setWantsPromotions(data.wants_promotions);
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {

            const response = await fetch('./api/returnUser', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email: session?.user?.email}),
            });
            const userData = await response.json();
            const userId = await userData.response;
            const id = userId.id;

            await fetch('./api/changeCustomerData', {
                method: 'POST',
                body: JSON.stringify({
                    accountId: Number(id),
                    firstName,
                    lastName,
                    wantsPromotions,
                    billingAddress,
                }),
                headers: { 'Content-Type': 'application/json' },
              });

              setError('');
              setSuccess('Data Saved Succesfully!');

        } catch (err) {
            console.log(err)
            setError('Something went wrong')
        }
    }
        
// for saved payment cards just display the last 4 digits of the card number
    return (
        <>
        <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Edit Profile</title>
        </Head>
        <div className ="container">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    
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
                <button type="submit">Save Changes</button>
                </form>
        </div>
        <p>
            Need to Change your Password? <a href="/changePassword">Change Password Here</a>
        </p>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </>
    );
};

export default editProfile;