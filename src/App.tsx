import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import DisplayCard from './components/DisplayCard';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [today, setToday] = useState(new Date());
  const [todayIsSunday, setTodayIsSunday] = useState<Boolean | undefined>();
  const [todayIsSundaySchool, setTodayIsSundaySchool] = useState<Boolean | undefined>();
  const [todayIsCombined, setTodayIsCombined] = useState<Boolean | undefined>();
  const [todayIsTheBlankSunday, setTodayIsTheBlankSunday] = useState<String | undefined>();
  const [numberOfPreviousSundaysInThisMonth, setNumberOfPreviousSundaysInThisMonth] = useState<Number | undefined>();
  const [todayString, setTodayString] = useState<String | undefined>();
  const [monthName, setMonthName] = useState<String | undefined>();

  // On init
  useEffect(() => {
       
  })
  return (
    <div className="App" id="mainContainer">
      <div></div>
      <DisplayCard
        today={today}
      >
      </DisplayCard>
      <div></div>
    </div>
  );
}

export default App;