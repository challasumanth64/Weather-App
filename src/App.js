import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";
import sunny from "./images/sunny.jpg";
import rainy from "./images/rainy.jpg";
import cloudy from "./images/cloudy.jpg";
import stormy from "./images/stormy.jpg";

function App() {
    const API_KEY = process.env.REACT_APP_API_KEY; // Replace with your OpenWeather API key
    const [city, setCity] = useState("Delhi"); // Default city
    const [weather, setWeather] = useState(null); // Default weather
    const [showCities, setShowCities] = useState(false);
    const cityListRef = useRef(null);

    // Define background images for different weather conditions
    const weatherBackgrounds = {
        Clear: sunny,
        Rain: rainy,
        Clouds: cloudy,
        Storm: stormy,
        Haze: cloudy,
    };

    const indianCities = [
        "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata", "Surat", "Pune", "Jaipur",
        "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane", "Bhopal", "Visakhapatnam", "Pimpri-Chinchwad",
        "Patna", "Vadodara", "Ghaziabad", "Ludhiana", "Agra", "Nashik", "Faridabad", "Meerut", "Rajkot",
        "Kalyan-Dombivli", "Vasai-Virar", "Varanasi", "Srinagar", "Aurangabad", "Dhanbad", "Amritsar",
        "Navi Mumbai", "Allahabad", "Ranchi", "Howrah", "Coimbatore", "Jabalpur", "Gwalior", "Vijayawada",
        "Jodhpur", "Madurai", "Raipur", "Kota", "Guwahati", "Chandigarh", "Solapur", "Hubli-Dharwad",
        "Bareilly", "Moradabad", "Mysore", "Gurgaon", "Aligarh", "Jalandhar", "Tiruchirappalli", "Bhubaneswar",
        "Salem", "Mira-Bhayandar", "Thiruvananthapuram", "Bhiwandi", "Saharanpur", "Gorakhpur", "Guntur",
        "Bikaner", "Amravati", "Noida", "Jamshedpur", "Bhilai", "Cuttack", "Firozabad", "Kochi", "Nellore",
        "Bhavnagar", "Dehradun", "Durgapur", "Asansol", "Rourkela", "Nanded", "Kolhapur", "Ajmer", "Gulbarga",
        "Jamnagar", "Ujjain", "Loni", "Siliguri", "Jhansi", "Ulhasnagar", "Jammu", "Sangli-Miraj & Kupwad",
        "Mangalore", "Erode", "Belgaum", "Ambattur", "Tirunelveli", "Malegaon", "Gaya", "Tiruppur", "Davanagere",
        "Kozhikode", "Akola", "Kurnool", "Bokaro Steel City", "Rajahmundry", "Ballari", "Agartala", "Bhagalpur",
        "Latur", "Dhule", "Korba", "Bhilwara", "Brahmapur", "Mysuru", "Muzaffarpur", "Ahmednagar", "Kollam",
        "Raghunathganj", "Bilaspur", "Shahjahanpur", "Thrissur", "Alwar", "Kakinada", "Nizamabad", "Sagar",
        "Tumkur", "Hisar", "Rohtak", "Panipat", "Darbhanga", "Kharagpur", "Aizawl", "Ichalkaranji", "Tirupati",
        "Karnal", "Bathinda", "Rampur", "Shivamogga", "Ratlam", "Modinagar", "Durg", "Shillong", "Imphal",
        "Hapur", "Ranipet", "Anantapur", "Arrah", "Karimnagar", "Parbhani", "Etawah", "Bharatpur", "Begusarai",
        "New Delhi", "Chhapra", "Kadapa", "Ramagundam", "Pali", "Satna", "Vizianagaram", "Katihar", "Hardwar",
        "Sonipat", "Nagercoil", "Thanjavur", "Murwara (Katni)", "Naihati", "Sambhal", "Nadiad", "Yamunanagar",
        "English Bazar", "Eluru", "Munger", "Panchkula", "Raiganj", "Sirsa", "Danapur", "Serampore", "Sultan Pur Majra",
        "Guna", "Jaunpur", "Panvel", "Shivpuri", "Surendranagar Dudhrej", "Unnao", "Chinsurah", "Alappuzha",
        "Kottayam", "Machilipatnam", "Shimla"
    ];

    // Function to fetch weather data from API
    const fetchWeather = async (searchCity) => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}&units=metric`
            );
            setWeather(response.data);
        } catch (error) {
            alert("Error fetching weather data. Please try again.");
        }
    };

    const handleSearch = (e) => {
        if (e.key === "Enter") {
            fetchWeather(city);
        }
    };

    const handleCityClick = (selectedCity) => {
        setCity(selectedCity);
        fetchWeather(selectedCity);
        setShowCities(false);
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (cityListRef.current && !cityListRef.current.contains(event.target)) {
                setShowCities(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [cityListRef]);

    return (
        <div
            className="app"
            style={{
                backgroundImage: `url(${weatherBackgrounds[weather?.weather[0]?.main]})`,
            }}
        >
            <div className="weather-container">
                {!weather && <h1 className="main-title">Weather App</h1>}
                <div className="search-container" ref={cityListRef}>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Enter city..."
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        onKeyPress={handleSearch}
                    />
                    <button className="city-list-btn" onClick={() => setShowCities(!showCities)}>Select City</button>
                    {showCities && (
                        <div className="city-list">
                            {indianCities.map((indianCity, index) => (
                                <div key={index} className="city-item" onClick={() => handleCityClick(indianCity)}>
                                    {indianCity}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                {weather && (
                    <div className="weather-info">
                        <h2>{weather.name}</h2>
                        <div className="weather-details">
                            <p className="temperature">{weather.main.temp}°C</p>
                            <p className="description">
                                {weather.weather[0].description}
                            </p>
                        </div>
                        <div className="additional-info">
                            <p>Humidity: {weather.main.humidity}%</p>
                            <p>Wind Speed: {weather.wind.speed} m/s</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
