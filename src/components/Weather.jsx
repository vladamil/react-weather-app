function Weather() {
   return (
      <div className="weather-main">
         <h3>Madrid</h3>
         <p>partly sunny</p>
         <div className="weather-icon">
            <p>min: 23°C</p>
            <img src="/icons/02d.png" alt="weather-icon" />
            <p>max: 27°C</p>
         </div>
         <p className="weather-temp">-22°</p>
         {/* DETAILS HERE */}
      </div>
   );
}

export default Weather;
