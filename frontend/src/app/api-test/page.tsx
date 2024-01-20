"use client";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/lawyers/all");
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    console.log(data);
    fetchData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {Array.isArray(data) ? (
        data.map((lawyer) => (
          <div key={lawyer.id}>
            <h1>{`${lawyer.fname} ${lawyer.lname}`}</h1>
            <p>Email: {lawyer.email}</p>
            <p>
              Date Registered:{" "}
              {new Date(lawyer.date_registered).toLocaleString()}
            </p>
            <p>Lawyer Type: {lawyer.lawyer_type}</p>
            <p>Status: {lawyer.status}</p>
            <br />
          </div>
        ))
      ) : (
        <p>No data available</p>
      )}
    </main>
  );
}
