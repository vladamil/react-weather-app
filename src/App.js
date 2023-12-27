import { useState, useEffect } from 'react';
import { API_URL, API_KEY } from './api';
import Input from './components/Input';
import Weather from './components/Weather';
import Forecast from './components/Forecast';
import Spinner from './components/Spinner';
import NotFound from './components/NotFound';

function App() {
   const [location, setLocation] = useState();
   const [city, setCity] = useState('');
   const [citySearchField, setCitySearchField] = useState('');
   const [units, setUnits] = useState('metric');
   const [weatherData, setWeatherData] = useState();
   const [forecastData, setForecastData] = useState();
   const [isLoading, setIsLoading] = useState(true);
   const [isError, setIsError] = useState(null);

   // Get initial current position(lat/lon)
   useEffect(() => {
      navigator.geolocation.getCurrentPosition(
         (position) => {
            setLocation({
               lat: position.coords.latitude,
               lon: position.coords.longitude,
            });
         },
         (error) => {
            setIsError(error.message);
            setIsLoading(false);
         }
      );
   }, []);

   useEffect(() => {
      // Get initial weather data based on current position
      if (location) {
         const getData = async () => {
            try {
               const res = await Promise.all([
                  fetch(
                     `${API_URL}/weather?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}&units=${units}`
                  ),
                  fetch(
                     `${API_URL}/forecast?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}&units=${units}`
                  ),
               ]);

               if (!res[0].ok || !res[1].ok) {
                  throw new Error('Could not fetch data.');
               }

               const weatherData = await res[0].json();
               const forecastData = await res[1].json();

               const forecastFilteredData = forecastData.list.filter(
                  (item, idx) => idx % 8 === 0
               );
               setWeatherData(weatherData);
               setForecastData(forecastFilteredData);
               setIsError(null);
               setIsLoading(false);
            } catch (error) {
               setIsError(error.message);
               setIsLoading(false);
            }
         };

         getData();
      }
   }, [location, units]);

   useEffect(() => {
      // Get weather data based on units change
      if (weatherData && !location) {
         setIsLoading(true);
         const getData = async () => {
            try {
               const res = await Promise.all([
                  fetch(
                     `${API_URL}/weather?q=${city}&appid=${API_KEY}&units=${units}`
                  ),
                  fetch(
                     `${API_URL}/forecast?q=${city}&appid=${API_KEY}&units=${units}`
                  ),
               ]);

               if (!res[0].ok || !res[1].ok) {
                  throw new Error('Could not fetch data.');
               }

               const weatherData = await res[0].json();
               const forecastData = await res[1].json();
               const forecastFilteredData = forecastData.list.filter(
                  (item, idx) => idx % 8 === 0
               );
               setWeatherData(weatherData);
               setForecastData(forecastFilteredData);
               setIsError(null);
               setIsLoading(false);
            } catch (error) {
               setIsError(error.message);
               setIsLoading(false);
            }
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
      navigator.geolocation.getCurrentPosition(
         (position) => {
            setLocation({
               lat: position.coords.latitude,
               lon: position.coords.longitude,
            });
         },
         (error) => {
            setIsError(error.message);
         }
      );
      setCity('');
   };

   // Get weather data based on city search
   const getWeatherByCity = async (city) => {
      setLocation(null);
      setCitySearchField('');
      setIsLoading(true);

      try {
         const res = await Promise.all([
            fetch(
               `${API_URL}/weather?q=${city}&appid=${API_KEY}&units=${units}`
            ),
            fetch(
               `${API_URL}/forecast?q=${city}&appid=${API_KEY}&units=${units}`
            ),
         ]);
         if (!res[0].ok || !res[1].ok) {
            throw new Error('We could not find data for that location.');
         }

         const weatherData = await res[0].json();
         const forecastData = await res[1].json();
         const forecastFilteredData = forecastData.list.filter(
            (item, idx) => idx % 8 === 0
         );
         setWeatherData(weatherData);
         setForecastData(forecastFilteredData);
         setIsError(null);
         setIsLoading(false);
      } catch (error) {
         setIsError(error.message);
         setIsLoading(false);
      }
   };

   return (
      <div className="app">
         <div className="container">
            <>
               <Input
                  units={units}
                  city={city}
                  citySearchField={citySearchField}
                  handleUnits={handleUnits}
                  handleCity={handleCity}
                  handleLocation={handleLocation}
                  getWeatherByCity={getWeatherByCity}
               />
               <div className="main">
                  {isLoading ? (
                     <Spinner />
                  ) : isError ? (
                     <NotFound error={isError} />
                  ) : (
                     <>
                        <Weather weather={weatherData} units={units} />
                        <Forecast forecast={forecastData} units={units} />
                     </>
                  )}
               </div>
            </>
         </div>
      </div>
   );
}

export default App;
