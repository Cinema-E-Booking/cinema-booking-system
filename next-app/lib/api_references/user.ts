export async function returnUserId (email: string|null|undefined) {
    try {
        const response = await fetch('./api/returnUser', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email}),
        });
        const userData = await response.json();
        const userId = await userData.response;
        const id = userId.id;

        return Number(id);
    } catch (err) {
        console.log(err);
    }
}

export async function getCustomerData (id: number|undefined) {
    try {
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

        return data;
    } catch (err) {
        console.log(err);
    }
}

export async function changeCustomerData (id: number|undefined, firstName: string, lastName: string, wantsPromotions: boolean, billingAddress: string) {
    try {
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

          return true;
    } catch (err) {
        console.log(err);
    }

    return null;
}

export async function newCustomer (email: string, password: string, firstName: string, lastName: string, wantsPromotions: boolean, billingAddress: string) {
    try {
        const response = await fetch('/api/newCustomer', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password, firstName, lastName, wantsPromotions, billingAddress}),
        });

        return true;
    } catch (err) {
        console.log(err)
    }

    return null;
} 

export async function getCustomerAccountId (email: string|null|undefined) {
    try {
        const userIdData = await fetch('./api/getId', {
            method: 'POST',
            body: JSON.stringify({
              email,
            }),
            headers: { 'Content-Type': 'application/json' },
          });
        const userData = await userIdData.json();
        const userId = await userData.response;

        return userId;
    } catch (err) {
        console.log(err)
    }

    return null;
}

export async function returnAllCustomers () {
    try {
        const response = await fetch('./api/getAllCustomers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
          });
        const responseData = await response.json();
        const customers = await responseData.response;

        return customers;
    } catch (err) {
        console.log(err);
    }

    return null;
}

export async function returnAllAdmins () {
    try {
        const response = await fetch('./api/getAllAdmins', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
          });
        const responseData = await response.json();
        const admins = await responseData.response;

        return admins;
    } catch (err) {
        console.log(err)
    }

    return null;
}