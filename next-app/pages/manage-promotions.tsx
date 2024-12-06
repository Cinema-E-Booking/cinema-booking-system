import Head from "next/head";
import React, { useState, useEffect } from "react";

const CreatePromotion = () => {
  const [code, setCode] = useState("");
  const [percentOff, setPercentOff] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [promotions, setPromotions] = useState([]);
  const [emailList, setEmailList] = useState<string[]>([]);
  const [subject, setSubject] = useState("");
  const [emailMessage, setEmailMessage] = useState("");

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await fetch("/api/allPromotions");
        const result = await response.json();

        if (result.data && Array.isArray(result.data.promotions)) {
          setPromotions(result.data.promotions);
          setSuccess("Promotions loaded");
        } else {
          setError("Failed to load promotions.");
        }
      } catch (error) {
        setError("An error occurred while fetching promotions.");
      }
    };

    fetchPromotions();
  }, []);

  const fetchEmails = async (promo: Array<String>) => {
    setSubject("Movie Savings Deals!");
    setEmailMessage(
      "Use code " +
        promo[0] +
        " to save up to " +
        promo[1] +
        "% at checkout. Valid now through " +
        promo[2]
    );
    try {
      const response = await fetch(`./api/getEmails`);
      const result = await response.json();

      if (response.ok) {
        setEmailList(result);
        setSuccess("Email created");
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      setError("Error happened while fetching emails");
    }
  };

  const sendEmails = async () => {
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailList, subject, emailMessage }),
      });

      if (!response.ok) {
        setError("Error sending promotion emails:");
      }
    } catch (error) {
      setError("Error happened while sending promotion emails");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!code || !percentOff || !endTime) {
      setError("All fields required");
      return;
    }

    const promotionData = {
      code,
      percentOff,
      endTime,
    };

    try {
      const response = await fetch("./api/newPromotion", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(promotionData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      setSuccess("Promotion created successfully!");
    } catch (err) {
      setError(String(err));
    }
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Manage Promotions</title>
      </Head>
      <header
        style={{
          textAlign: "center",
          padding: "10px",
          backgroundColor: "#00165a",
          color: "white",
        }}
      >
        <h1>Manage Promotions</h1>
        <a
          href="/admin"
          style={{ color: "white", textDecoration: "underline" }}
        >
          Admin Home
        </a>
      </header>
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          padding: "20px",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h2>Add Promotion</h2>
          <label htmlFor="promo-code">Promotion Code:</label>
          <input
            type="text"
            placeholder="Promo Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <label htmlFor="promo-discount">Discount Percentage:</label>
          <input
            type="number"
            placeholder="Discount Percentage"
            value={percentOff}
            onChange={(e) => setPercentOff(e.target.value)}
            required
          />
          <label htmlFor="promo-end">End Date:</label>
          <input
            type="date"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
          <button
            type="submit"
            style={{
              padding: "10px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Add Promotion
          </button>
        </form>

        <h2>Existing Promotions</h2>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "center",
            border: "1px solid #ccc",
            backgroundColor: "#fff",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#00165a", color: "white" }}>
              <th style={{ border: "1px solid #ccc", padding: "10px" }}>
                Promo Code
              </th>
              <th style={{ border: "1px solid #ccc", padding: "10px" }}>
                Discount
              </th>
              <th style={{ border: "1px solid #ccc", padding: "10px" }}>
                End Date
              </th>
              <th style={{ border: "1px solid #ccc", padding: "10px" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {promotions.map((promotion, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid #ccc", padding: "10px" }}>
                  {promotion[0]}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "10px" }}>
                  {promotion[1]}%
                </td>
                <td style={{ border: "1px solid #ccc", padding: "10px" }}>
                  {promotion[2]}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "10px" }}>
                  <button
                    style={{
                      padding: "5px",
                      backgroundColor: "#f44336",
                      color: "white",
                      border: "none",
                      marginRight: "5px",
                    }}
                  >
                    Delete
                  </button>
                  <button
                    style={{
                      padding: "5px",
                      backgroundColor: "#2196F3",
                      color: "white",
                      border: "none",
                      marginRight: "5px",
                    }}
                    onClick={() => fetchEmails(promotion)}
                  >
                    Create Promo Email
                  </button>
                  <button
                    style={{
                      padding: "5px",
                      backgroundColor: "#4CAF50",
                      color: "white",
                      border: "none",
                    }}
                    onClick={() => sendEmails()}
                  >
                    Send Promotion
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      {error && (
        <p style={{ color: "red", textAlign: "center", marginTop: "10px" }}>
          {error}
        </p>
      )}
      {success && (
        <p style={{ color: "green", textAlign: "center", marginTop: "10px" }}>
          {success}
        </p>
      )}
      <footer
        style={{
          textAlign: "center",
          padding: "10px",
          backgroundColor: "#00165a",
          color: "white",
        }}
      >
        <p>© 2024 Cinema E-Booking - Manage Promotions</p>
      </footer>
    </>
  );
};

export default CreatePromotion;
