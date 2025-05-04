// Variables
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn"); // Fixed typo: searchBnt -> searchBtn
const weatherInfo = document.getElementById("weatherInput");
const errorInfo = document.getElementById("errorInfo");
const API_KEY = "84cf007586292a4a191e20860845941c";

// Event listener for the search button
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim(); // Trim whitespace from input
    if (city) {
        getWeather(city); // Call the function if input is valid
    } else {
        errorInfo.textContent = "Please enter a city name."; // Show error if input is empty
        weatherInfo.textContent = ""; // Clear weather info
    }
});

// Fetch weather data
function getWeather(city) {
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    fetch(weatherURL)
        .then((response) => {
            if (response.ok) {
                return response.json(); // Parse JSON if response is OK
            } else {
                throw new Error("City not found."); // Handle invalid city
            }
        })
        .then((data) => {
            // Display weather information
            weatherInfo.textContent = `Weather in ${data.name}: ${data.weather[0].description}, Temperature: ${data.main.temp}°C`;
            errorInfo.textContent = ""; // Clear any previous error
        })
        .catch((error) => {
            // Handle errors (network or API issues)
            errorInfo.textContent = error.message;
            weatherInfo.textContent = ""; // Clear weather info on error
            console.error("Error fetching weather data:", error); // Log error for debugging
        });
}