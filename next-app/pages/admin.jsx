import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Admin Panel</title>
      </Head>
      <header className="header">
        <h1>Admin Panel</h1>
        <nav className="nav-links">
          <Link href="/">Home Page</Link>
          <Link href="/manage-movies">Manage Movies</Link>
          <Link href="/manage-promotions">Manage Promotions</Link>
        </nav>
      </header>
      <main>
        <div className="admin-buttons">
          <section>
            <Link href="/manage-movies">
              <button className="primary-btn">Manage Movies</button>
            </Link>
          </section>
          <section>
            <Link href="/manage-promotions">
              <button className="primary-btn">Manage Promotions</button>
            </Link>
          </section>
        </div>

        {/* Manage Users Section */}
        <section className="admin-options">
          <h2>Manage Users</h2>
          <div className="admin-forms">
            <label htmlFor="user-name">User Name:</label>
            <input
              type="text"
              id="user-name"
              placeholder="Enter user name"
              className="input-field"
            />
            <label htmlFor="user-role">Role:</label>
            <select id="user-role" className="dropdown">
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
            </select>
            <button type="submit" className="add-btn">
              Add User
            </button>
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
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn">Delete</button>
                </td>
              </tr>
              <tr>
                <td>Jane Smith</td>
                <td>Admin</td>
                <td>
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
      <footer className="footer">
        <p>© 2024 Cinema E-Booking - Admin Panel</p>
      </footer>

      {/* CSS */}
      <style jsx>{`
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f9f9f9;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          background-color: #00165a;
          color: white;
        }
        h1 {
          margin: 0;
        }
        .nav-links {
          display: flex;
          gap: 20px;
        }
        .nav-links a {
          color: white;
          text-decoration: none;
          font-size: 16px;
        }
        .nav-links a:hover {
          text-decoration: underline;
        }
        .admin-buttons {
          display: flex;
          justify-content: center;
          margin: 20px;
        }
        .primary-btn {
          background-color: #003bb3;
          color: white;
          border: none;
          border-radius: 5px;
          padding: 10px 20px;
          margin: 10px;
          cursor: pointer;
          font-size: 16px;
        }
        .primary-btn:hover {
          background-color: #00287a;
        }
        .admin-options {
          margin: 20px auto;
          padding: 20px;
          max-width: 800px;
          background: white;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
        }
        .admin-forms {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }
        .input-field,
        .dropdown {
          padding: 8px;
          border-radius: 4px;
          border: 1px solid #ccc;
        }
        .add-btn {
          background-color: #28a745;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
        }
        .add-btn:hover {
          background-color: #218838;
        }
        .admin-table {
          width: 100%;
          border-collapse: collapse;
        }
        .admin-table th,
        .admin-table td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }
        .admin-table th {
          background-color: #00165a;
          color: white;
        }
        .edit-btn {
          background-color: #ffc107;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
        }
        .edit-btn:hover {
          background-color: #e0a800;
        }
        .delete-btn {
          background-color: #dc3545;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
        }
        .delete-btn:hover {
          background-color: #c82333;
        }
        .footer {
          text-align: center;
          padding: 10px;
          background-color: #00165a;
          color: white;
          margin-top: 20px;
        }
      `}</style>
    </>
  );
}
