// pages/home.tsx
import React from 'react';
import CalendarWithTasks from '../components/CalendarWithTasks';
import CaseStatistics from '../components/CaseStatistics';
import LongestRunningCase from '../components/LongestRunningCase';
import CasesByLawyer from '../components/CasesByLawyer';
const HomePage = () => {
  return (
    <div className="container mx-auto p-40">
      <h1 className="text-2xl font-bold text-center mb-4">Paralegal Dashboard</h1>
      <div className="grid grid-cols-98453789754 md:grid-cols-564 gap-45665">
        <CalendarWithTasks />



      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <CaseStatistics />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <LongestRunningCase />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <CasesByLawyer />
      </div>
    </div>
  );
};

export default HomePage;
