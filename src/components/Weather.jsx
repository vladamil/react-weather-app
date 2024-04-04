import React from 'react';
import { FaTemperatureHigh, FaTemperatureLow } from 'react-icons/fa';
import { TbArrowBarToDown } from 'react-icons/tb';
import { WiHumidity, WiStrongWind } from 'react-icons/wi';
import { BsPerson } from 'react-icons/bs';

function Weather({ weather, units }) {
   return (
      <div className="weather-main">
         <h3>{weather.name}</h3>
         <p>{weather.weather[0].description}</p>
         <div className="weather-icon">
            <p className="min-max">
               <FaTemperatureLow
                  style={{
                     fontSize: '25px',
                     color: 'lightblue',
                     marginRight: '5px',
                  }}
               />
               {Math.round(weather.main.temp_min)}°
            </p>
            <img
               src={`/icons/${weather.weather[0].icon}.png`}
               alt="weather-icon"
            />
            <p className="min-max">
               <FaTemperatureHigh
                  style={{
                     fontSize: '25px',
                     color: '#ff3d00',
                     marginRight: '5px',
                  }}
               />
               {Math.round(weather.main.temp_max)}°
            </p>
         </div>

         <p className="weather-temp">{Math.round(weather.main.temp)}°</p>

         <div className="line"></div>

         <div className="weather-details">
            <div className="details-item">
               <WiHumidity className="icon" />
               <span className="text">Humidity: </span> {weather.main.humidity}%
            </div>
            <div className="details-item">
               <TbArrowBarToDown className="icon" />
               <span className="text">Pressure: </span>
               <div>{weather.main.pressure}</div>
            </div>
            <p className="details-item">
               <WiStrongWind className="icon" />
               <span className="text">Wind: </span> {weather.wind.speed}{' '}
               {units === 'metric' ? 'm/s' : 'mph'}
            </p>
            <p className="details-item">
               <BsPerson className="icon" />
               <span className="text">Feels Like: </span>
               {Math.round(weather.main.feels_like)}°
            </p>
         </div>
      </div>
   );
}

export default React.memo(Weather);
