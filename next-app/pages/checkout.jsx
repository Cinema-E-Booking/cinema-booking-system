import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Checkout</title>
      </Head>
      <header>
        <h1>Checkout</h1>
      </header>
        <main>
            <h2>The Total is: [Total]</h2>
            <form action="confirmation.html" method="POST">
            <label htmlFor="purchaseMethod">Select Method of Purchase</label>
            <select id="purchaseMethod" name="purchaseMethod" required="">
                <option value="Credit Card 1">Credit Card 1</option>
                <option value="Debit Card 1">Debit Card 1</option>
                <option value="Gift Card 1">Gift Card 1</option>
            </select>
            <label htmlFor="addMethodofPurchase">Add Method of Purchase</label>
            <p id="addMethodofPurchase" name="addMethodofPurchase" />
            <p>
                <label htmlFor="ccn">Credit/Debit Card Number:</label>
                <input type="text" id="ccn" name="creditCardNumber" required="" />
                <label htmlFor="name">Name on Card:</label>
                <input type="text" id="name" name="creditCardName" required="" />
                <label htmlFor="name">Billing Address:</label>
                <input type="text" id="name" name="creditCardName" required="" />
            </p>
            <div style={{ textAlign: "center" }}>
                <button>Add Method of Payment</button>
            </div>
            <p />
            <div style={{ textAlign: "center" }}>
                <button type="submit">
                <a href="confirmation.html" />
                    Cancel Payment
                </button>
                <button type="submit">
                <a href="confirmation.html" />
                    Confirm Payment
                </button>
            </div>
            </form>
        </main>
        <footer>
            <p>© 2024 Cinema E-Booking</p>
        </footer>
    </>
  );
}