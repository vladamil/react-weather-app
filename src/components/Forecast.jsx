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
      <>
         <div>Forecast Details</div>
         <div className="days">
            {forecast.map((day, idx) => {
               return (
                  <div className="card" key={idx}>
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
      </>
   );
}

export default Forecast;
