import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

export default function AdminProfile() {
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    email: "admin@example.com",
    role: "Admin",
    address: "Enter your address",
    password: "",
    name: "Admin Name",
    dob: "1985-01-14",
    jobTitle: "Admin Job Title",
    profilePicture: "/images/default-profile.jpg",
  });

  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", role: "Customer", isEditing: false },
    { id: 2, name: "Jane Smith", role: "Admin", isEditing: false },
  ]);

  const [newUser, setNewUser] = useState({ name: "", role: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleProfilePictureChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfile({ ...profile, profilePicture: event.target.result });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const addUser = () => {
    if (newUser.name && newUser.role) {
      setUsers([...users, { ...newUser, id: users.length + 1, isEditing: false }]);
      setNewUser({ name: "", role: "" });
    }
  };

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const toggleEditUser = (id) => {
    setUsers(users.map((user) =>
      user.id === id ? { ...user, isEditing: !user.isEditing } : user
    ));
  };

  const handleEditUserChange = (id, newName) => {
    setUsers(users.map((user) =>
      user.id === id ? { ...user, name: newName } : user
    ));
  };

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
              <Link href="/manage-promotions">Manage Promotions</Link>
            </li>
            <li>
              <Link href="/admin">Profile</Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="half-screen profile-container">
          <section className="profile-header">
            <div className="profile-name">{profile.name}</div>
            <div className="logout-icons">
              <span className="icon-gear">⚙️</span>
              <span className="icon-logout">🔌</span>
            </div>
          </section>

          {/* Profile Picture Section */}
          <section className="profile-picture-section">
            <img
              src={profile.profilePicture}
              alt="Profile Picture"
              className="profile-picture"
            />
            <label htmlFor="upload-photo" className="upload-btn">
              Upload Photo
              <input
                type="file"
                id="upload-photo"
                className="file-input"
                onChange={handleProfilePictureChange}
              />
            </label>
            <button className="delete-btn">Delete Profile Picture</button>
          </section>

          {/* Profile Info Section */}
          <section className="profile-info">
            <h2>Admin Profile</h2>
            <div className="profile-details">
              <div className="label">Email:</div>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleInputChange}
                className="editable-field"
                disabled={!editMode}
              />
            </div>
            <div className="profile-details">
              <div className="label">Role:</div>
              <input
                type="text"
                name="role"
                value={profile.role}
                onChange={handleInputChange}
                className="editable-field"
                disabled={!editMode}
              />
            </div>
            <div className="profile-details">
              <div className="label">Home Address:</div>
              <input
                type="text"
                name="address"
                value={profile.address}
                onChange={handleInputChange}
                className="editable-field"
                disabled={!editMode}
              />
            </div>
            <div className="profile-details">
              <div className="label">Change Password:</div>
              <input
                type="password"
                name="password"
                value={profile.password}
                onChange={handleInputChange}
                className="editable-field"
                disabled={!editMode}
              />
            </div>
            <div className="profile-details">
              <div className="label">Name:</div>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
                className="editable-field"
                disabled={!editMode}
              />
            </div>
            <div className="profile-details">
              <div className="label">Date of Birth:</div>
              <input
                type="text"
                name="dob"
                value={profile.dob}
                onChange={handleInputChange}
                className="editable-field"
                disabled={!editMode}
              />
            </div>
            <div className="profile-details">
              <div className="label">Job Title:</div>
              <input
                type="text"
                name="jobTitle"
                value={profile.jobTitle}
                onChange={handleInputChange}
                className="editable-field"
                disabled={!editMode}
              />
            </div>
          </section>

          {/* Save Changes Button */}
          <button className="save-btn" onClick={() => setEditMode(!editMode)}>
            {editMode ? "Save Changes" : "Edit Profile"}
          </button>
        </div>

        {/* Existing Users Box */}
        <div className="half-screen users-box">
          <h2>Existing Users</h2>
          <div className="add-user-form">
            <input
              type="text"
              name="name"
              placeholder="User Name"
              value={newUser.name}
              onChange={handleUserInputChange}
              className="editable-field"
            />
            <input
              type="text"
              name="role"
              placeholder="Role"
              value={newUser.role}
              onChange={handleUserInputChange}
              className="editable-field"
            />
            <button className="add-btn" onClick={addUser}>
              Add User
            </button>
          </div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>User Name</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>
                    {user.isEditing ? (
                      <input
                        type="text"
                        value={user.name}
                        onChange={(e) => handleEditUserChange(user.id, e.target.value)}
                        className="editable-field"
                      />
                    ) : (
                      user.name
                    )}
                  </td>
                  <td>{user.role}</td>
                  <td>
                    <button className="edit-btn" onClick={() => toggleEditUser(user.id)}>
                      {user.isEditing ? "Save" : "Edit"}
                    </button>
                    <button className="delete-btn" onClick={() => deleteUser(user.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
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
          color: white; /* Sets the text color to white */
          text-decoration: none;
          font-weight: bold;
          transition: border-bottom 0.3s ease;
        }

        .navbar ul li a:hover {
          text-decoration: underline;
          border-bottom: 2px solid white;
        }

        .main-content {
          display: flex;
          justify-content: space-between;
          padding: 20px;
        }

        .half-screen {
          width: 48%;
          background: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .profile-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .profile-name {
          font-size: 24px;
          font-weight: bold;
        }

        .logout-icons {
          display: flex;
          gap: 10px;
        }

        .icon-gear,
        .icon-logout {
          cursor: pointer;
          font-size: 20px;
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

        .delete-btn {
          background-color: #dc3545;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 14px;
          margin-top: 10px;
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
          display: flex;
          justify-content: space-between;
          margin-bottom: 15px;
        }

        .profile-details .label {
          font-weight: bold;
          width: 30%;
        }

        .editable-field {
          width: 65%;
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
          background: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .add-user-form {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .add-user-form input {
          width: 45%;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        .add-btn {
          background-color: #007bff;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 14px;
        }

        .add-btn:hover {
          background-color: #0056b3;
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

        .delete-btn:hover {
          background-color: #c82333;
        }
      `}</style>
    </>
  );
}