import { useState, useEffect } from 'react';
import { API_URL, API_KEY } from './api';

import Input from './components/Input';
import Weather from './components/Weather';

function App() {
   const [location, setLocation] = useState();

   const [weatherData, setWeatherData] = useState();

   // Get current position(lat / lon)
   useEffect(() => {
      navigator.geolocation.getCurrentPosition((position) => {
         setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
         });
      });
   }, []);

   // Get initial weather data based on current position
   useEffect(() => {
      if (location) {
         const getData = async () => {
            const res = await fetch(
               `${API_URL}/weather?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}`
            );
            const data = await res.json();

            setWeatherData(data);
         };

         getData();
      }
   }, [location]);

   return (
      <div className="app">
         <div className="container">
            <Input />
            <Weather />
            <div>Hello!</div>
            <div>Hello!</div>
         </div>
      </div>
   );
}

export default App;
