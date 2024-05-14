import axios from "axios";
import { openWeatherApiKey } from '../apiKeys'
import { useState, useEffect } from "react";

const Weather = () => {

    const city = 'chennai';
    const [weatherData, setweatherData] = useState(null);

    useEffect(() => {
        axios
          .get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherApiKey}&units=metric`)
          .then(response => {
            setweatherData(response.data);
          })
          .catch(error => {
            console.error('Error fetching weather data:', error);
          });
      }, [ openWeatherApiKey, city ]);

      console.log(city)
      console.log(openWeatherApiKey)
      console.log(weatherData.main.temp)
}

export default Weather;