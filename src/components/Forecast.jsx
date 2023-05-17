function Forecast({ forecast }) {
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
            <div className="day-header">
               <p className="day-name">Friday</p>
               <img src="./icons/09d.png" alt="weather-icon" />
               <p>heavy rain</p>
            </div>
            <div className="day-temp">17°</div>
            <div className="day-data">
               <p>
                  min: <span>17°</span>
               </p>
               <p>
                  max: <span>22°</span>
               </p>
               <p>
                  humidity: <span>82%</span>
               </p>
               <p>
                  wind: <span>3m/s</span>
               </p>
               <p>
                  pressure: <span>998</span>
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
                     onClick={() => {
                        console.log(idx);
                     }}
                     style={{
                        // backgroundColor: `${idx === 3 ? '#656673' : ''}`,
                        border: `${idx === 3 ? '1px solid white' : 'none'}`,
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

export default Forecast;
