import Head from "next/head";
import { FormEvent, useState, useEffect }  from "react";
import { useSession } from "next-auth/react";
import { returnUserId, getCustomerData, changeCustomerData } from "../lib/api_references/user"

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
        const id = await returnUserId(session?.user?.email);
        const data = await getCustomerData(id);

        setFirstName(data.first_name);
        setLastName(data.last_name);
        setBillingAddress(data.billing_address);
        setWantsPromotions(data.wants_promotions);
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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