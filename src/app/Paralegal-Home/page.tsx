"use client";
import React from "react";
import LinePlot from "../components/LinePlot";
import Calendar from "../components/Calendar";

export default function Home() {
  return (
    <>
      <section className="dashboard-container">
        <div className="flex flex-row ...">
          <div>
            <div className="flex flex-col ...">
              <div>
                <h1 className="p-8 inset-x-0 top-0">This is the paralegal Page</h1>
              </div>
              <div>
                <div className="flex gap-14">
                  <div className="flex-grow">
                    <LinePlot />
                    <LongestCasesTable />
                  </div>
                  <Calendar />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
