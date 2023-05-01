import { useState } from 'react';

function Input({ units, handleUnits }) {
   const [city, setCity] = useState('');

   const handleChange = (e) => {
      setCity(e.target.value);
   };

   return (
      <div className="search-bar">
         <div>Reload BTN</div>
         <div>
            <form>
               <input
                  className="input-city"
                  type="text"
                  placeholder="Enter city..."
                  value={city}
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
