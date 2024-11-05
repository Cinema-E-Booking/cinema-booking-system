import Head from "next/head";
import Link from "next/link";

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
        <div>
            <section>
                <Link href="/manage-movies">
                    <button>Manage Movies</button>
                </Link>
            </section>
            <div></div>
            <section>
                <Link href="/manage-promotions">
                    <button>Manage Promotions</button>
                </Link>
            </section>
        </div>

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