import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import Header from "../components/Header";
import WeatherImage from "../components/WeatherImage";

import City from '../components/City';

function Home() {
  const history = useHistory();
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('Tokyo');

  const [cities, setCities] = useState([
    {
      name: 'Jakarta',
      currentTemp: '0',
      color: 'bg-yellow-500'
    },
    {
      name: 'Sydney',
      currentTemp: '0',
      color: 'bg-blue-500'
    },
    {
      name: 'Tokyo',
      currentTemp: '0',
      color: 'bg-red-500'
    }
  ]);

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_WEATHER_API}`)
    .then(function(response) {
      const weather = response.data;
      setWeatherData(weather);
    })
    .catch(function(error) {
      console.warn(error);
    });
  }, [city]);

  useEffect(() => {
    const searchParams = history.location.search;
    const urlParams = new URLSearchParams(searchParams);
    const city = urlParams.get("city");
    if (city) {
      setCity(city);
    }
  }, [history]);

  const { currentTemp } = useMemo(() => {
    let currentTemp = '';
    if (weatherData) {
      currentTemp = `${Math.round(weatherData.main.temp)}°C`;
    }
    return {
      currentTemp,
    };
  }, [weatherData]);

  return (
    <div className="flex flex-col h-screen bg-green-200">
      {/* <City cityName={"Tokyo"} temp={"10\u00b0C"} color={"bg-yellow-500"}/> */}
      {
        cities.map((item, index) => (
          <City cityName={item.name} temp={item.currentTemp} color={item.color}/>
        ))
      }
    </div>
  );
}

export default Home;
