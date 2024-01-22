// components/Calendar.tsx
import React, { useState } from "react";
import "./Calendar.css";
const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const month = date.getMonth();
    const year = date.getFullYear();
    return new Date(year, month + 1, 0).getDate();
  };

  const addMonths = (date: string | number | Date, months: number) => {
    let newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + months);
    return newDate;
  };

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const prevMonth = () => {
    setCurrentDate(addMonths(currentDate, -1));
  };

  const getMonthDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    let days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
    }
    return days;
  };

  const formatDate = (date: Date, formatStr: string) => {
    const day = date.getDate().toString();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear().toString();
    return formatStr
      .replace("MMMM", month)
      .replace("yyyy", year)
      .replace("d", day);
  };

  const days = getMonthDays();

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        {/* Navigation buttons and date display */}
      </div>
      <div className="calendar-grid">{/* Calendar days */}</div>
    </div>
  );
};

export default Calendar;
