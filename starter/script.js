// 1fe0a80bb9cd82a0e4938c4f81815a36
// Uncomment the following line
// API key
const apiKey = "1fe0a80bb9cd82a0e4938c4f81815a36";
var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=1fe0a80bb9cd82a0e4938c4f81815a36"

// Display current date and time
$("#time-heading").text(dayjs().format("DD MMM YYYY [at] hh:mm:ss a"));
setInterval(function () {
  $("#time-heading").text(dayjs().format("DD MMM YYYY [at] hh:mm:ss a"));
}, 1000);


var cities = [];
//Function to add City name as button
function renderButtons(){

  $("#buttons-view").empty();
  // Retrieve cities from local storage
  var storedCities = JSON.parse(localStorage.getItem("cities")) || [];

  $("#buttons-view").empty();  
  for (let i = 0; i < cities.length; i++) {
 
  //Create Element
  var newButton = $("<button>");
  //add text content
  newButton.text(cities[i]);
  // Add Bootstrap classes to style the button
  newButton.addClass("btn btn-secondary mb-2");
  //Append on page
  $("#buttons-view").append(newButton);
  // Add a line break after each button
  $("#buttons-view").append("<br>");

    
  
    newButton.on("click", function(event){
    console.log("button clicked");

    console.log(cities[i]);
    getWeather(cities[i])
  });
}
}

$("#add-city").on("click", function(event){
  event.preventDefault();
  // $(".form-input").val()
  var searchCity = $("#city-input").val().trim();
  //   console.log("=============");
  //   console.log(searchCity);
  cities.push(searchCity);

  // Store updated cities in local storage
  localStorage.setItem("cities", JSON.stringify(cities));


  getWeather(searchCity);
  renderButtons();
})

// Function to fetch weather data for a specific city
function getWeather(city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
   //   Call a function to update the UI with the current weather data
    //   console.log("In getWeather Funct");
      updateCurrentWeather(data);
      var cityDiv = document.querySelector(".city");

      cityDiv.textContent = `5-Day Weather forcast in ${data.name}`
      // Now, fetch the 5-day forecast using the geographical coordinates from the current weather data
      const { coord } = data;
      get5DayForecast(coord.lat, coord.lon);
    })
    .catch(function (error) {
      console.error("Error fetching current weather data:", error);
    });
}

// Function to update the UI with current weather data
function updateCurrentWeather(data) {
  // Modify this function to update the UI elements with current weather data
  console.log("Current Weather Data:", data);
  // Modify this function to update the UI elements with current weather data

  console.log("Current Weather Data:", data);

  // Clear previous content
  document.getElementById('today').innerHTML = '';

  // Create a Bootstrap card
  const card = document.createElement('div');
  card.className = 'card';

  // Card body
  const cardBody = document.createElement('div');
  cardBody.className = 'card-body';

// Display city name
const cityName = document.createElement('h5');
cityName.className = 'card-title';
cityName.textContent = `Today's Weather in ${data.name}`;
cardBody.appendChild(cityName);

// Weather icon
const weatherIcon = document.createElement('div');
weatherIcon.className = 'weather-icon';
cardBody.appendChild(weatherIcon);

// Update weather icon in updateCurrentWeather function

const iconCode = data.weather[0].icon;
const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
weatherIcon.innerHTML = `<img src="${iconUrl}" alt="Weather Icon" />`;

// Display temperature
const temperature = document.createElement('p');
temperature.className = 'card-text';
temperature.textContent = `Temperature in kelvin: ${data.main.temp} K`;
cardBody.appendChild(temperature);

// Display temperature
const temperatureC = document.createElement('p');
temperatureC.className = 'card-text';
var tempC = `${data.main.temp}`-273.15;
temperatureC.textContent = `Temperature in Celcius: ${tempC.toFixed(2)} C`;
cardBody.appendChild(temperatureC);

// Display wind speed
const windSpeed = document.createElement('p');
windSpeed.className = 'card-text';
windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
cardBody.appendChild(windSpeed);

// Display humidity
const humidity = document.createElement('p');
humidity.className = 'card-text';
humidity.textContent = `Humidity: ${data.main.humidity}%`;
cardBody.appendChild(humidity);

// Append card body to card
card.appendChild(cardBody);

// Append card to the #today section
document.getElementById('today').appendChild(card);
}


// Function to update the UI with 5-day forecast data
function update5DayForecast(data) {
  // Modify this function to update the UI elements with 5-day forecast data
  console.log("5-Day Forecast Data:", data);

  // Clear previous content
  document.getElementById('forecast').innerHTML = '';


 // Display 5-day forecast data
 const forecastData = data.list;

 // Iterate over the forecast data for each day
 for (let i = 0; i < forecastData.length; i += 8) { // Data is provided every 3 hours, so we skip to the next day

   // Create a Bootstrap card for each day
   const card = document.createElement('div');
   card.className = 'card border-primary mb-3';
   card.style = 'max-width: 18rem;';

   // Card body
   const cardBody = document.createElement('div');
   cardBody.className = 'card-body text-primary';

   // Display date
   const date = document.createElement('h5');
   date.className = 'card-title';
   date.textContent = dayjs(forecastData[i].dt_txt).format('DD MMM YYYY');
   cardBody.appendChild(date);

     // Weather icon
     const weatherIcon = document.createElement('div');
     weatherIcon.className = 'weather-icon';
     cardBody.appendChild(weatherIcon);

   // Update weather icon in update5DayForecast function
    const iconCode = forecastData[i].weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
    weatherIcon.innerHTML = `<img src="${iconUrl}" alt="Weather Icon" />`;

   // Display temperature
   const temperature = document.createElement('p');
   temperature.className = 'card-text';
   temperature.textContent = `Temperature: ${forecastData[i].main.temp} K`;
   cardBody.appendChild(temperature);

   // Convert Kelvin to Celsius
    const temperatureC = document.createElement('p');
    temperatureC.className = 'card-text';
    var tempC = forecastData[i].main.temp - 273.15;
    temperatureC.textContent = `Temperature in Celsius: ${tempC.toFixed(2)} C`;
    cardBody.appendChild(temperatureC);

   // Display wind speed
   const windSpeed = document.createElement('p');
   windSpeed.className = 'card-text';
   windSpeed.textContent = `Wind Speed: ${forecastData[i].wind.speed} m/s`;
   cardBody.appendChild(windSpeed);

   // Display humidity
   const humidity = document.createElement('p');
   humidity.className = 'card-text';
   humidity.textContent = `Humidity: ${forecastData[i].main.humidity}%`;
   cardBody.appendChild(humidity);

   // Append card body to card
   card.appendChild(cardBody);

   // Append card to the #forecast section
   document.getElementById('forecast').appendChild(card);
 }
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


