import { ImLocation2 } from 'react-icons/im';

function Input({
   units,
   city,
   citySearchField,
   handleUnits,
   handleCity,
   handleLocation,
   getWeatherByCity,
}) {
   const handleChange = (e) => {
      handleCity(e.target.value);
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      getWeatherByCity(city);
      e.target.children[0].blur();
   };

   return (
      <div className="search-bar">
         <div>
            <ImLocation2
               onClick={handleLocation}
               style={{ fontSize: '30px', color: 'white' }}
            />
         </div>
         <div>
            <form onSubmit={handleSubmit}>
               <input
                  className="input-city"
                  type="text"
                  placeholder="Enter city..."
                  value={citySearchField}
                  onChange={handleChange}
               />
            </form>
         </div>
         <div>
            <button
               onClick={() => handleUnits('metric')}
               className={`temp-btn ${units === 'metric' ? 'active' : ''}`}
               value="metric"
            >
               °C
            </button>
            <button
               onClick={() => handleUnits('imperial')}
               className={`temp-btn ${units === 'imperial' ? 'active' : ''}`}
            >
               °F
            </button>
         </div>
      </div>
   );
}

export default Input;
