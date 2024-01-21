"use client";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const formData = new FormData();
        // formData.append('username', 'hazem@lawyer.com');
        // formData.append('password', 'pass');
        const mdata = {
          username: 'hazem@laywer.com',
          password: 'pass'
        };
        var f = new FormData();
        f.append('username', 'hazem@laywer.com');
        f.append('password', 'pass');

        const response1 = await fetch("http://localhost:8000/auth/token",{
        method:"POST",
        headers:{
          'accept': "application/json",
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mdata),
        credentials: 'include'});

        console.log(response1);
        const response2 = await fetch("http://localhost:8000/lawyers/all",
        );
        const jsonData = await response2.json();
        console.log(jsonData);
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
