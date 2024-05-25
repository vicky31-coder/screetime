import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import ky from "ky";
import { openWeatherApiKey, city } from "../apiKeys.js"

const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await ky.get(
          `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherApiKey}&units=metric`
        );
        const json = await response.json();
        setWeatherData(json);
        console.log(json)
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <View style={styles.container}>
      {weatherData ? (
        <Text style={styles.temperature}>{weatherData.main.temp}°C</Text>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  temperature: {
    color: "black",
    fontSize: responsiveFontSize(5),
    textAlign: "center",
  },
});

export default WeatherComponent;
