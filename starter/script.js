// 1fe0a80bb9cd82a0e4938c4f81815a36

// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=1fe0a80bb9cd82a0e4938c4f81815a36
var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=1fe0a80bb9cd82a0e4938c4f81815a36"

fetch(queryUrl).then(function(response){
    return response.json();
})
.then(function(data){
    console.log(data);
})

// Display current date and time
$("#time-heading").text(dayjs().format("DD MMM YYYY [at] hh:mm:ss a"));
setInterval(function () {
  $("#time-heading").text(dayjs().format("DD MMM YYYY [at] hh:mm:ss a"));
}, 1000);

// API key
const apiKey = "1fe0a80bb9cd82a0e4938c4f81815a36";

// Function to fetch weather data for a specific city
function getWeather(city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Call a function to update the UI with the current weather data
      updateCurrentWeather(data);
      // Now, fetch the 5-day forecast using the geographical coordinates from the current weather data
      const { coord } = data;
      get5DayForecast(coord.lat, coord.lon);
    })
    .catch(function (error) {
      console.error("Error fetching current weather data:", error);
    });
}

// Function to fetch the 5-day forecast for a specific city using geographical coordinates
function get5DayForecast(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Call a function to update the UI with the 5-day forecast data
      update5DayForecast(data);
    })
    .catch(function (error) {
      console.error("Error fetching 5-day forecast data:", error);
    });
}

// Function to update the UI with current weather data
function updateCurrentWeather(data) {
  // Modify this function to update the UI elements with current weather data
  console.log("Current Weather Data:", data);
}

// Function to update the UI with 5-day forecast data
function update5DayForecast(data) {
  // Modify this function to update the UI elements with 5-day forecast data
  console.log("5-Day Forecast Data:", data);
}

// Event listener for the form submission
document.getElementById("search-form").addEventListener("submit", function (event) {
  event.preventDefault();
  const city = document.getElementById("search-input").value;
  // Call the getWeather function with the user-inputted city
  getWeather(city);
});

