import { useState } from 'react';
import React from 'react';

function Forecast({ forecast, units }) {
   const [dayIndex, setDayIndex] = useState(0);

   const WEEK = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
   ];

   const today = new Date().getDay();

   const forecastWeek = WEEK.slice(today, WEEK.length).concat(
      WEEK.slice(0, today)
   );

   return (
      <div className="forecast-container">
         <div className="day-details">
            <div className="day-header" style={{ width: '33%' }}>
               <p className="day-name">
                  {dayIndex === 0 ? 'Tommorow' : forecastWeek[dayIndex]}
               </p>
               <img
                  src={`/icons/${forecast[dayIndex].weather[0].icon}.png`}
                  alt="weather-icon"
               />
               <p style={{ fontSize: '12px' }}>
                  {forecast[dayIndex].weather[0].description}
               </p>
            </div>
            <div className="day-temp">
               {Math.round(forecast[dayIndex].main.temp)}°
            </div>
            <div className="day-data" style={{ width: '33%' }}>
               <p>
                  min:{' '}
                  <span>{Math.round(forecast[dayIndex].main.temp_min)}°</span>
               </p>
               <p>
                  max:{' '}
                  <span>{Math.round(forecast[dayIndex].main.temp_max)}°</span>
               </p>
               <p>
                  humidity: <span>{forecast[dayIndex].main.humidity}%</span>
               </p>
               <p>
                  wind:{' '}
                  <span>
                     {forecast[dayIndex].wind.speed}{' '}
                     {units === 'metric' ? 'm/s' : 'mph'}
                  </span>
               </p>
               <p>
                  pressure: <span>{forecast[dayIndex].main.pressure}</span>
               </p>
               <p>
                  feels like: <span>18°</span>
               </p>
            </div>
         </div>

         <div className="days">
            {forecast.map((day, idx) => {
               return (
                  <div
                     className="day-card"
                     key={idx}
                     onClick={() => setDayIndex(idx)}
                     style={{
                        // backgroundColor: `${idx === 3 ? '#656673' : ''}`,
                        border: `${
                           idx === dayIndex ? '1px solid white' : 'none'
                        }`,
                     }}
                  >
                     <p>{forecastWeek[idx].substring(0, 3).toUpperCase()}</p>
                     <img
                        src={`/icons/${day.weather[0].icon}.png`}
                        alt="weather-icon"
                     />
                     <p>{Math.round(day.main.temp)}°</p>
                  </div>
               );
            })}
         </div>
      </div>
   );
}

export default React.memo(Forecast);
