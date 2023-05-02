import { useState, useEffect } from 'react';
import { API_URL, API_KEY } from './api';
import Input from './components/Input';
import Weather from './components/Weather';

function App() {
   const [location, setLocation] = useState();
   const [city, setCity] = useState('');
   const [units, setUnits] = useState('metric');
   const [weatherData, setWeatherData] = useState();

   // Get current position(lat/lon)
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
               `${API_URL}/weather?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}&units=${units}`
            );
            const data = await res.json();
            setWeatherData(data);
         };

         getData();
      }

      if (weatherData && !location) {
         const getData = async () => {
            const res = await fetch(
               `${API_URL}/weather?q=${city}&appid=${API_KEY}&units=${units}`
            );
            const data = await res.json();
            setWeatherData(data);
         };

         getData();
      }

      console.log('hello');
   }, [location, units]);

   const handleUnits = (unit) => {
      setUnits(unit);
   };

   const handleCity = (city) => {
      setCity(city);
   };

   const getWeatherByCity = async (city) => {
      setLocation(null);
      const res = await fetch(
         `${API_URL}/weather?q=${city}&appid=${API_KEY}&units=${units}`
      );
      const data = await res.json();
      setWeatherData(data);
   };

   return (
      <div className="app">
         <div className="container">
            <Input
               units={units}
               city={city}
               handleUnits={handleUnits}
               handleCity={handleCity}
               getWeatherByCity={getWeatherByCity}
            />
            <Weather />
            <div>Hello!</div>
            <div>Hello!</div>
         </div>
      </div>
   );
}

export default App;
