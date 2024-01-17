"use client";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/all-lawyers");
      const jsonData = await response.json();
      setData(jsonData);
    };

    fetchData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {data.map((lawyer, index) => (
        <div key={index}>
          <p>Email: {lawyer[0]}</p>
          <p>Password: {lawyer[1]}</p>
        </div>
      ))}
    </main>
  );
}
