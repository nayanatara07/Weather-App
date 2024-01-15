import React, { useEffect, useState } from 'react'
import "./App.css"
import env from "./utils/validateEnv"
import search_icon from "./assets/search.png";
import clear_icon from "./assets/clear.png";
import cloud_icon from "./assets/cloud.png";
import drizzle_icon from "./assets/drizzle.png";
import rain_icon from "./assets/rain.png";
import snow_icon from "./assets/snow.png";
import wind_icon from "./assets/wind.png";
import humidity_icon from "./assets/humidity.png";


function App() {
  const [wicon, setWicon] = useState(cloud_icon);

  const search = async (e) => {
    e.preventDefault(); // Prevents the default behavior of the Enter key
    const element = document.getElementsByClassName("cityInput")
    if (element[0].value === "")
    {
      return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&APPID=${env.REACT_APP_WEATHER_API}`;

    let response = await fetch(url);
    let data = await response.json();
    const humidity = document.getElementsByClassName("humidity-percent");
    const wind = document.getElementsByClassName("wind-rate");
    const temperature = document.getElementsByClassName("weather-temp");
    const location = document.getElementsByClassName("weather-location");

    humidity[0].innerHTML = data.main.humidity + " %";
    wind[0].innerHTML = Math.floor(data.wind.speed) + " km/h";
    temperature[0].innerHTML = Math.floor(data.main.temp) + " ⁰c";
    location[0].innerHTML = data.name;
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

    const getWeatherIcon = (iconCode) => {
      return iconMappings[iconCode] || clear_icon;
    };

    const iconCode = data.weather[0].icon;
    const weatherIcon = getWeatherIcon(iconCode);
    setWicon(weatherIcon);
  }

  return (
    <div className='container'>
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
      <div className="weather-image">
        <img src={wicon} alt="" />
      </div>
      <div className="weather-temp">24⁰c</div>
      <div className="weather-location">London</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percent">64%</div>
            <div className="text">Humidity</div>
          </div>
        </div>

        <div className="element">
          <img src={wind_icon} alt="" className="icon" />
          <div className="data">
            <div className="wind-rate">18 km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
