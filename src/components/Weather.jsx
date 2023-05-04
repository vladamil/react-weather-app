import { FaTemperatureHigh, FaTemperatureLow } from 'react-icons/fa';
import { TbArrowBarToDown } from 'react-icons/tb';
import { WiHumidity, WiStrongWind } from 'react-icons/wi';
import { BsPerson } from 'react-icons/bs';

function Weather() {
   return (
      <div className="weather-main">
         <h3>Madrid</h3>
         <p>partly sunny</p>
         <div className="weather-icon">
            <p className="min-max">
               <FaTemperatureLow
                  style={{
                     fontSize: '25px',
                     color: 'lightblue',
                     marginRight: '5px',
                  }}
               />
               23°
            </p>
            <img src="/icons/11d.png" alt="weather-icon" />
            <p className="min-max">
               <FaTemperatureHigh
                  style={{
                     fontSize: '25px',
                     color: 'red',
                     marginRight: '5px',
                  }}
               />
               27°
            </p>
         </div>

         <p className="weather-temp">25°</p>

         <div className="line"></div>

         <div className="weather-details">
            <div className="details-item">
               <WiHumidity className="icon" />
               <span className="text">Humidity: </span> 78%
            </div>
            <div className="details-item">
               <TbArrowBarToDown className="icon" />
               <span className="text">Pressure: </span>
               <div>1005</div>
            </div>
            <p className="details-item">
               <WiStrongWind className="icon" />
               <span className="text">Wind: </span> 5 m/s
            </p>
            <p className="details-item">
               <BsPerson className="icon" />
               <span className="text">Feels Like: </span>
               23°
            </p>
         </div>
      </div>
   );
}

export default Weather;
