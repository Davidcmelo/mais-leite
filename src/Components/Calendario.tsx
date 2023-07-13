'use client'
import { format } from 'date-fns';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export function Calendario() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date:any) => {
    setSelectedDate(date);
  };
  
  function formatDate(date:any) {
    return format(date, 'dd/MM/yyyy');
  }

  return (
    <div>
      <DatePicker selected={selectedDate} onChange={handleDateChange} dateFormat="dd/MM/yyyy" className="border-2 border-emerald-900 rounded " placeholderText="Selecione uma data"  />
    </div>
  );
}


