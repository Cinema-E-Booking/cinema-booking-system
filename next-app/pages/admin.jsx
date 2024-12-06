import Head from "next/head";
import Link from "next/link";

export default function AdminProfile() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Admin Profile</title>
      </Head>

      {/* Navbar */}
      <header className="navbar">
        <div className="brand">
          <img src="/images/logo.jpg" alt="Cinema E-Booking Logo" />
          <h1>Cinema E-Booking</h1>
        </div>
        <nav>
          <ul>
            <li>
              <Link href="/">Home Page</Link>
            </li>
            <li>
              <Link href="/manage-movies">Manage Movies</Link>
            </li>
            <li>
              <Link href="/admin">Profile</Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main>
        <div className="profile-container">
          {/* Profile Picture Section */}
          <section className="profile-picture-section">
            <img
              src="/images/default-profile.jpg"
              alt="Profile Picture"
              className="profile-picture"
            />
            <label htmlFor="upload-photo" className="upload-btn">
              Upload Photo
              <input type="file" id="upload-photo" className="file-input" />
            </label>
          </section>

          {/* Profile Info Section */}
          <section className="profile-info">
            <h2>Admin Profile</h2>
            <div className="profile-details">
              <label>Email:</label>
              <input
                type="email"
                placeholder="admin@example.com"
                className="editable-field"
              />
            </div>
            <div className="profile-details">
              <label>Role:</label>
              <input
                type="text"
                placeholder="Admin"
                className="editable-field"
              />
            </div>
            <div className="profile-details">
              <label>Home Address:</label>
              <input
                type="text"
                placeholder="Enter your address"
                className="editable-field"
              />
            </div>
            <div className="profile-details">
              <label>Change Password:</label>
              <input
                type="password"
                placeholder="New password"
                className="editable-field"
              />
            </div>
          </section>

          {/* Save Changes Button */}
          <button className="save-btn">Save Changes</button>
        </div>

        {/* Existing Users Box */}
        <div className="users-box">
          <h2>Existing Users</h2>
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
        </div>
      </main>

      {/* Footer */}
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
          display: flex;
          flex-direction: column;
          height: 100vh;
        }

        .navbar {
          background-color: #002b5c;
          padding: 10px;
          color: white;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .navbar img {
          width: 80px;
          height: auto;
          margin-right: 10px;
        }

        .navbar .brand {
          display: flex;
          align-items: center;
        }

        .navbar ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
        }

        .navbar ul li {
          margin-right: 20px;
        }

        .navbar ul li a {
          color: white;
          text-decoration: none;
          font-weight: bold;
          transition: border-bottom 0.3s ease;
        }

        .navbar ul li a:hover {
          text-decoration: underline;
          border-bottom: 2px solid white;
        }

        .profile-container {
          max-width: 600px;
          margin: 20px auto;
          background: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .profile-picture-section {
          text-align: center;
          margin-bottom: 20px;
        }

        .profile-picture {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #ddd;
        }

        .upload-btn {
          margin-top: 10px;
          display: inline-block;
          background-color: #003bb3;
          color: white;
          padding: 8px 16px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 14px;
          position: relative;
        }

        .file-input {
          display: none;
        }

        .profile-info {
          width: 100%;
        }

        .profile-info h2 {
          text-align: center;
          margin-bottom: 20px;
          color: #333;
        }

        .profile-details {
          margin-bottom: 15px;
        }

        .profile-details label {
          font-weight: bold;
          display: block;
          margin-bottom: 5px;
        }

        .readonly-field {
          width: 100%;
          padding: 8px;
          background-color: #f9f9f9;
          border: 1px solid #ccc;
          border-radius: 5px;
          color: #555;
          cursor: not-allowed;
        }

        .editable-field {
          width: 100%;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        .save-btn {
          background-color: #28a745;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          margin-top: 20px;
        }

        .save-btn:hover {
          background-color: #218838;
        }

        .footer {
          text-align: center;
          padding: 10px;
          background-color: #00165a;
          color: white;
          margin-top: auto;
        }

        .users-box {
          margin-top: 30px;
          background: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .admin-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }

        .admin-table th,
        .admin-table td {
          padding: 12px;
          text-align: left;
          border: 1px solid #ddd;
        }

        .admin-table th {
          background-color: #f4f4f4;
        }

        .edit-btn,
        .delete-btn {
          background-color: #007bff;
          color: white;
          border: none;
          padding: 5px 10px;
          border-radius: 5px;
          cursor: pointer;
          margin-right: 10px;
        }

        .edit-btn:hover {
          background-color: #0056b3;
        }

        .delete-btn {
          background-color: #dc3545;
        }

        .delete-btn:hover {
          background-color: #c82333;
        }
      `}</style>
    </>
  );
}
