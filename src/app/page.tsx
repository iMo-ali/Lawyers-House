"use client";
import React from "react";
// Import additional components
import LinePlot from "../app/components/LinePlot";
import LongestCasesTable from "../app/components/LongestCase";
import Calendar from "../app/components/Calendar";
export default function Home() {
  return (
    <>
      <section className="dashboard-container">
        <div className="flex">
          <div className="flex-grow">
            <LinePlot />
            <LongestCasesTable />
          </div>
          <Calendar />
        </div>
      </section>
    </>
  );
}
