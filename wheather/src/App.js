import React, { useEffect,useState } from "react";
import axios from "axios";
import "./App.css"

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    onSearch(city);
  };
  return (
    <div className="search-bar">
      <input
        type="text"
        value={city}
        placeholder="Enter city name"
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};
const WheatherCard = ({ title, data }) => {
  return (
    <div className="weather-card">
      <h3>{title}</h3>
      <p>{data}</p>
    </div>
  );
};

const WeatherDisplay = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (city) {
      setLoading(true);
      axios
        .get("https://api.weatherapi.com/v1/current.json", {
          params: {
            key: "4c5e34e3c1ee40f8845175341232312",
            q: city,
          },
        })
        .then((response) => {
          setWeatherData(response.data);
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
          alert("Falied to fetch weather data");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [city]);
  return (
    <div className="weather-display">
      {loading && <p>Loading...</p>}
      {!loading && weatherData && (
        <div className="weather-cards">
          <WheatherCard
            title="Temperature"
            data={`${weatherData.current.temp_c}°C`}
          />
          <WheatherCard
            title="Humidity"
            data={`${weatherData.current.humidity}%`}
          />
          <WheatherCard
            title="Condition"
            data={`${weatherData.current.condition.text}`}
          />
          <WheatherCard
            title="Temperature"
            data={`${weatherData.current.wind_kph}kph`}
          />
        </div>
      )}
    </div>
  );
};
export default function App() {
  const [city, setCity] = useState("");

  const handleSearch = (searchCity) => {
    setCity(searchCity);
  };

  return (
    <div className="App">
      <SearchBar onSearch={handleSearch} />
      <WeatherDisplay city={city} />
    </div>
  );
}
