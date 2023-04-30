function Weather() {
   return (
      <div className="weather-main">
         <h3>Belgrade</h3>
         <p>partly sunny</p>
         <div className="weather-icon">
            <p>min: 23</p>
            {/* ICON HERE */}
            <p>max: 27</p>
         </div>
         <p>22 C</p>
         {/* DETAILS HERE */}
      </div>
   );
}

export default Weather;
