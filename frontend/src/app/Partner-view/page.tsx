"use client";
import React from "react";
import CalendarWithTasks from "../components/CalendarWithTasks";
import CaseStatistics from "../components/CaseStatistics";
import CasesByLawyer from "../components/CasesByLawyer";
import Navbar from "../components_Partner/Navbar(Partner)";
import TotalNumberOfLawyers from "../components_Partner/TotalNumberOfLawyers";
import TotalNumberOfClients from "../components_Partner/TotalNumberOfClients";
import TotalNumberOfSecretaries from "../components_Partner/TotalNumberOfSecretaries";

export default function PartnerPage() {
  return (
    <>
      <section>
        <Navbar />
      </section>

      <div className="container mx-auto p-40">
        <h1 className="text-2xl font-bold text-center mb-4">
          Partner Dashboard
        </h1>
        <div className="grid grid-cols-98453789754 md:grid-cols-564 gap-45665"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TotalNumberOfClients />
          <TotalNumberOfLawyers />
          <TotalNumberOfSecretaries />

          <CaseStatistics />
          <CasesByLawyer />
          <CalendarWithTasks />
        </div>
      </div>
    </>
  );
}
