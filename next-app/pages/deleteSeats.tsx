import Head from "next/head";
import React, { useState, useEffect } from "react";

const DeleteSeats = () => {
    const [seatId, setSeatId] = useState<number>(0);
    const [error, setError] = useState("");

const deleteSeat = async (id: number) => {
    console.log('delete seat check:', id);
    try {
      const response = await fetch(`./api/deleteSeat?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("seat deleted successfully");
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      setError("Error happened while deleting seat");
    }
  };

  return (
    <>
    <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title> Delete Seats </title>
    </Head>
    <div className="container">
            <label htmlFor="seatId">SeatId:</label>
            <input
              type="number"
              value={seatId}
              onChange={(e) => setSeatId(parseInt(e.target.value, 10))}
              required
            />
        <button onClick={() => deleteSeat(seatId)}>Delete</button>
    </div>
    </>
    )

};
export default DeleteSeats;