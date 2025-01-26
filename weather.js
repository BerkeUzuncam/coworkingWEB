// Selecteer elementen uit de DOM
let currentCityEl = document.querySelector("#current-city");
let currentCountryEl = document.querySelector("#current-country");
let currentTimeEl = document.querySelector("#current-time");
let currentDateEl = document.querySelector("#current-date");
let locationInputEl = document.querySelector("#location-input");
let weatherForm = document.querySelector("#weather-form");
let currentIcon = document.querySelector("#current-temperature-icon");
let currentTempEl = document.querySelector("#current-temperature");
let currentConditionEl = document.querySelector("#current-condition");

// Functie om temperatuur weer te geven
function displayTemperature(res) {
  let humidityEl = document.querySelector("#current-humidity");
  let windEl = document.querySelector("#current-wind");

  if (!res.data.city) {
    currentCountryEl.innerHTML = "";
    currentCityEl.innerHTML = "📍Not found";
    currentTempEl.innerHTML = ``;
    currentConditionEl.innerHTML = "";
    humidityEl.innerHTML = "";
    windEl.innerHTML = "";
  } else {
    currentCountryEl.innerHTML = res.data.country;
    currentCityEl.innerHTML = `📍${res.data.city}`;
    let icon = res.data.condition.icon_url;
    currentIcon.src = icon;
    let temp = Math.floor(res.data.temperature.current);
    currentTempEl.innerHTML = `${temp}°C`;
    currentConditionEl.innerHTML = res.data.condition.description;
    let humidity = res.data.temperature.humidity;
    humidityEl.innerHTML = `${humidity} %`;
    let wind = res.data.wind.speed;
    windEl.innerHTML = `${wind} km/h`;
  }
  let date = res.data.time * 1000;
  currentTimeEl.innerHTML = formatDate(date);
  getForecast(res.data.city);
}

// Functie om een stad te zoeken
function searchCity(city) {
  let apiKey = "o63c6afa36060dtb755bc2adb841329a";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(displayTemperature);
}

// Functie om de stad te tonen op basis van invoer
function displayCity(event) {
  event.preventDefault();
  searchCity(locationInputEl.value);
}

weatherForm.addEventListener("submit", displayCity);
searchCity("Gent");

// Functie om datum en tijd te formatteren
function formatDate() {
  let date = new Date();
  let months = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ];
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let year = date.getFullYear();
  let month = months[date.getMonth()];
  let currentDate = date.getDate();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let ampm = hour >= 12 ? "PM" : "AM";
  let formattedTime = `${hour % 12 || 12}:${minutes} ${ampm}`;
  currentDateEl.innerHTML = `${currentDate} ${month}, ${year}`;
  return formattedTime;
}

setInterval(formatDate, 60000);

// Functie om weersvoorspelling op te halen
function getForecast(city) {
  let forecastApiKey = "o63c6afa36060dtb755bc2adb841329a";
  let forecastApiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${forecastApiKey}&units=metric`;

  axios.get(forecastApiUrl).then(displayForecast);
}

// Functie om dag te formatteren
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

// Functie om weersvoorspelling weer te geven
function displayForecast(res) {
  let response = res.data.daily;
  let forecastHtml = document.querySelector("#weather-forecast");
  let forecast = "";

  let forecastLocationEl = document.querySelector("#forecast-location");
  forecastLocationEl.innerHTML = `${res.data.city} Weekly Forecast`;

  response.forEach(function (day, index) {
    if (index < 5) {
      forecast += `
      <div class="daily-weather-forecast">
        <p class="forecast--day">${formatDay(day.time)}</p>
        <img class="forecast--icon" src="${day.condition.icon_url}" />
        <p>
          <span class="max-temperature-forecast">${Math.floor(day.temperature.maximum)} /</span>
          <span class="min-temperature-forecast">${Math.floor(day.temperature.minimum)}</span>
        </p>
      </div>`;
    }
  });

  forecastHtml.innerHTML = forecast;
}
