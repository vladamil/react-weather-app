import { useState, useEffect } from 'react';
import { API_URL, API_KEY } from './api';
import Input from './components/Input';
import Weather from './components/Weather';

function App() {
   const [location, setLocation] = useState();
   const [city, setCity] = useState('');
   const [citySearchField, setCitySearchField] = useState('');
   const [units, setUnits] = useState('metric');
   const [weatherData, setWeatherData] = useState();

   // Get initial current position(lat/lon)
   useEffect(() => {
      navigator.geolocation.getCurrentPosition((position) => {
         setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
         });
      });
   }, []);

   useEffect(() => {
      // Get initial weather data based on current position
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

      // Get weather data based on units change
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
      setCitySearchField(city);
   };

   // Get current position
   const handleLocation = () => {
      navigator.geolocation.getCurrentPosition((position) => {
         setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
         });
      });
   };

   // Get weather data based on city search
   const getWeatherByCity = async (city) => {
      setLocation(null);
      setCitySearchField('');
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
               citySearchField={citySearchField}
               handleUnits={handleUnits}
               handleCity={handleCity}
               handleLocation={handleLocation}
               getWeatherByCity={getWeatherByCity}
            />
            <Weather />
            <div>Forecast Details</div>
            <div>Forecast 5 Days</div>
         </div>
      </div>
   );
}

export default App;
