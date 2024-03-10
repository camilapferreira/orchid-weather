function elementById(id) {
  return document.querySelector(id);
}

function setValue(id, value) {
  elementById(id).innerHTML = value;
}

function updateWeather(response) {
  let data = response.data;
  let condition = data.condition;
  let temperature = data.temperature.current;
  let humidity = data.temperature.humidity;
  let wind = data.wind.speed;
  let description = condition.description;
  let imageIcon = condition.icon_url;
  let icon = elementById("#weather-icon");
  icon.src = imageIcon;
  let date = new Date(data.time * 1000);
  let timeInfo = formatDate(date);

  setValue("#current-temperature", Math.round(temperature));
  setValue("#api-humidity", humidity);
  setValue("#api-wind-speed", wind);
  setValue("#weather-status", description);
  setValue("#day-time", timeInfo);
}

function formatDate(date) {
  let hour = date.getHours();
  let minutes = date.getMinutes();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hour < 10) {
    hour = `0${hour}`;
  }

  return `${day} ${hour}:${minutes}`;
}

function searchData(city) {
  let apiKey = "44b4d9f5e3a3baf490c33c5519ot4f0a";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(updateWeather);
}

function search(data) {
  data.preventDefault();
  let searchCity = document.querySelector("#search-input");
  let cityName = document.querySelector("#weather-app-city");
  cityName.innerHTML = searchCity.value;
  city = searchCity.value;
  searchData(city);
  getForecast(city);
}

let searchInput = document.querySelector("#search-form");
searchInput.addEventListener("submit", search);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "44b4d9f5e3a3baf490c33c5519ot4f0a";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="weather-forecast-day">
            <div class="weather-forecast-date">${formatDay(day.time)}</div>
            <img
              src="${day.condition.icon_url}"
              alt=""
              width="56"
            />
            <div class="forecast-temperatures">
              <span class="max-temperature-forecast">${Math.round(
                day.temperature.maximum
              )}°</span>
              <span class="min-temperature-forecast">${Math.round(
                day.temperature.minimum
              )}°</span>
            </div>
          </div>`;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

searchData("San Francisco");
getForecast("San Francisco");
