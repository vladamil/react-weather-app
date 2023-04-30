import { useState } from 'react';

function Input() {
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
         <div>2 Temp BTNS</div>
      </div>
   );
}

export default Input;
