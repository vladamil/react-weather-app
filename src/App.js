import { useState, useEffect } from 'react';
import { API_URL, API_KEY } from './api';
import Input from './components/Input';
import Weather from './components/Weather';
import Forecast from './components/Forecast';

function App() {
   const [location, setLocation] = useState();
   const [city, setCity] = useState('');
   const [citySearchField, setCitySearchField] = useState('');
   const [units, setUnits] = useState('metric');
   const [weatherData, setWeatherData] = useState();
   const [ForecastData, setForecastData] = useState();
   const [isLoading, setIsLoading] = useState(true);

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
            const res = await Promise.all([
               fetch(
                  `${API_URL}/weather?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}&units=${units}`
               ),
               fetch(
                  `${API_URL}/forecast?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}&units=${units}`
               ),
            ]);
            const weatherData = await res[0].json();
            const forecastData = await res[1].json();
            setWeatherData(weatherData);
            setForecastData(forecastData);
            setIsLoading(false);
         };

         getData();
      }
   }, [location, units]);

   useEffect(() => {
      // Get weather data based on units change
      if (weatherData && !location) {
         setIsLoading(true);
         const getData = async () => {
            const res = await Promise.all([
               fetch(
                  `${API_URL}/weather?q=${city}&appid=${API_KEY}&units=${units}`
               ),
               fetch(
                  `${API_URL}/forecast?q=${city}&appid=${API_KEY}&units=${units}`
               ),
            ]);
            const weatherData = await res[0].json();
            const forecastData = await res[1].json();
            setWeatherData(weatherData);
            setForecastData(forecastData);
            setIsLoading(false);
         };

         getData();
      }
   }, [units]);

   const handleUnits = (unit) => {
      setUnits(unit);
   };

   const handleCity = (city) => {
      setCity(city);
      setCitySearchField(city);
   };

   // Get current position on demand (lat/lon)
   const handleLocation = () => {
      navigator.geolocation.getCurrentPosition((position) => {
         setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
         });
      });
      setCity('');
   };

   // Get weather data based on city search
   const getWeatherByCity = async (city) => {
      setLocation(null);
      setCitySearchField('');
      setIsLoading(true);

      const res = await Promise.all([
         fetch(`${API_URL}/weather?q=${city}&appid=${API_KEY}&units=${units}`),
         fetch(`${API_URL}/forecast?q=${city}&appid=${API_KEY}&units=${units}`),
      ]);
      const weatherData = await res[0].json();
      const forecastData = await res[1].json();
      setWeatherData(weatherData);
      setForecastData(forecastData);
      setIsLoading(false);
   };

   return (
      <div className="app">
         {isLoading ? (
            <h1 style={{ color: 'white' }}>LOADING</h1>
         ) : (
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
               <Weather weather={weatherData} units={units} />
               <Forecast />
            </div>
         )}
      </div>
   );
}

export default App;
