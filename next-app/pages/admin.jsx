import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Admin</title>
      </Head>
      <header>
            <h1>Admin Panel</h1>
      </header>
      <main>
        {/* Manage Movies Section */}
            <section className="admin-options">
            <h2>Manage Movies</h2>
            <div className="admin-forms">
                {/* Movie management form */}
                <label htmlFor="movie-title">Movie Title:</label>
                <input type="text" id="movie-title" placeholder="Enter movie title" />
                <label htmlFor="movie-description">Movie Description:</label>
                <input
                type="text"
                id="movie-description"
                placeholder="Enter description"
                />
                <label htmlFor="category">Category:</label>
                <select id="category">
                    <option value="currently-running">Currently Running</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="classic">Classic</option>
                </select>
                <label htmlFor="showtimes">Showtimes (comma-separated):</label>
                <input
                    type="text"
                    id="showtimes"
                    placeholder="e.g., 12:00 PM, 03:00 PM"
                />
                <button type="submit">Add Movie</button>
            </div>
            </section>
            {/* Manage Promotions Section */}
            <section className="admin-options">
            <h2>Manage Promotions</h2>
            <div className="admin-forms">
                <label htmlFor="promo-title">Promotion Title:</label>
                <input
                    type="text"
                    id="promo-title"
                    placeholder="Enter promotion title"
                />
                <label htmlFor="promo-description">Promotion Description:</label>
                <input
                    type="text"
                    id="promo-description"
                    placeholder="Enter description"
                />
                <label htmlFor="discount">Discount Percentage:</label>
                <input
                    type="number"
                    id="discount"
                    placeholder="Enter discount percentage"
                />
                <label htmlFor="start-date">Start Date:</label>
                <input type="date" id="start-date" />
                <label htmlFor="end-date">End Date:</label>
                <input type="date" id="end-date" />
                <button type="submit">Add Promotion</button>
            </div>
            </section>
            {/* Manage Users Section */}
            <section className="admin-options">
            <h2>Manage Users</h2>
            <div className="admin-forms">
                <label htmlFor="user-name">User Name:</label>
                <input type="text" id="user-name" placeholder="Enter user name" />
                <label htmlFor="user-role">Role:</label>
                <select id="user-role">
                    <option value="admin">Admin</option>
                    <option value="customer">Customer</option>
                </select>
                <button type="submit">Add User</button>
            </div>
            {/* Existing Users Table */}
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>John Doe</td>
                        <td>Customer</td>
                        <td>
                            <button className="edit">Edit</button>
                            <button className="delete">Delete</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Jane Smith</td>
                        <td>Admin</td>
                        <td>
                            <button className="edit">Edit</button>
                            <button className="delete">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            </section>
        </main>
        <footer>
            <p>© 2024 Cinema E-Booking - Admin Panel</p>
        </footer>
    </>
  );
}