import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Manage Promotions</title>
      </Head>
      <header>
            <h1>Manage Promotions</h1>
      </header>
        <main>
            <form action="#" method="POST">
            <label htmlFor="promo-title">Promotion Title:</label>
            <input type="text" id="promo-title" name="promo-title" required="" />
            <label htmlFor="promo-desc">Promotion Description:</label>
            <textarea
                id="promo-desc"
                name="promo-desc"
                required=""
                defaultValue={""}
            />
            <label htmlFor="promo-discount">Discount Percentage:</label>
            <input
                type="number"
                id="promo-discount"
                name="promo-discount"
                required=""
            />
            <label htmlFor="promo-start">Start Date:</label>
            <input type="date" id="promo-start" name="promo-start" required="" />
            <label htmlFor="promo-end">End Date:</label>
            <input type="date" id="promo-end" name="promo-end" required="" />
            <button type="submit">Add Promotion</button>
            </form>
            <h2>Existing Promotions</h2>
            <table>
            <tbody>
                <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Discount</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Actions</th>
                </tr>
                {/* Example of a row (this should be dynamically generated in the real system) */}
                <tr>
                <td>Promo 1</td>
                <td>Discount on weekend movies</td>
                <td>20%</td>
                <td>2024-10-01</td>
                <td>2024-10-31</td>
                <td>
                    <button>Edit</button>
                    <button>Delete</button>
                </td>
                </tr>
            </tbody>
            </table>
        </main>
        <footer>
            <p>© 2024 Cinema E-Booking - Admin Panel</p>
        </footer>
    </>
  );
}