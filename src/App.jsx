import React, { useEffect, useState } from 'react';
import "./App.css";
import env from "./utils/validateEnv";
import search_icon from "./assets/search.png";
import clear_icon from "./assets/clear.png";
import cloud_icon from "./assets/cloud.png";
import drizzle_icon from "./assets/drizzle.png";
import rain_icon from "./assets/rain.png";
import snow_icon from "./assets/snow.png";
import wind_icon from "./assets/wind.png";
import humidity_icon from "./assets/humidity.png";

function WeatherElement({ icon, value, text }) {
  return (
    <div className={`element ${value ? "" : "hidden"}`}>
      <img src={icon} alt="" className="icon" />
      <div className="data">
        <div className="data-value">{value}</div>
        <div className="text">{text}</div>
      </div>
    </div>
  );
}

function App() {
  const [weatherData, setWeatherData] = useState({
    humidity: "",
    wind: "",
    temperature: "",
    location: "",
    weatherIcon: cloud_icon,
  });


  useEffect(() => {
    async function currentLocation(myLocation) {
      await fetchData(myLocation)
    }
    currentLocation("hyderabad")
  }, [])

  const getWeatherIcon = (iconCode) => {
    const iconMappings = {
      "01d": clear_icon,
      "01n": clear_icon,
      "02d": cloud_icon,
      "02n": cloud_icon,
      "03d": drizzle_icon,
      "03n": drizzle_icon,
      "04d": drizzle_icon,
      "04n": drizzle_icon,
      "09d": rain_icon,
      "09n": rain_icon,
      "10d": rain_icon,
      "10n": rain_icon,
      "13d": snow_icon,
      "13n": snow_icon,
    };
    return iconMappings[iconCode] || clear_icon;
  };

  const fetchData = async (city) => {
    try
    {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&APPID=${env.REACT_APP_WEATHER_API}`;

      const response = await fetch(url);
      const data = await response.json();
      console.log(data)
      const { humidity, temp } = data.main
      const { name, wind } = data
      const { icon } = data.weather[0]
      const weatherIcon = getWeatherIcon(icon);

      setWeatherData({
        humidity: `${humidity} %`,
        wind: `${Math.floor(wind.speed)} km/h`,
        temperature: `${Math.floor(temp)} ⁰c`,
        location: name,
        weatherIcon: weatherIcon,
      });
    } catch (error)
    {
      console.error("Error fetching weather data:", error);
    }
  };

  const search = async (e) => {
    e.preventDefault();
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "")
    {
      return 0;
    }
    await fetchData(element[0].value);
  };

  return (
    <div className='container'>
      <div className="heading">Meow Weather App</div>
      <div className='body-content'>
      
      <form className="top-bar">
        <input
          type="text"
          className="cityInput"
          placeholder="Search"
        />
        <button className="search-icon" onClick={search}>
          <img src={search_icon} alt="" />
        </button>
      </form>

      {weatherData && (
        <>
          <div className="weather-image">
            <img src={weatherData.weatherIcon} alt="" />
          </div>
          <div className="weather-temp">{weatherData.temperature}</div>
          <div className="weather-location">{weatherData.location}</div>

          <div className="data-container">
            <WeatherElement
              icon={humidity_icon}
              value={weatherData.humidity}
              text="Humidity"
            />
            <WeatherElement
              icon={wind_icon}
              value={weatherData.wind}
              text="Wind Speed"
            />
          </div>
        </>
      )}
      </div>
    </div>

  );
}

export default App;
