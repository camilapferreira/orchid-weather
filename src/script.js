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
  searchData(searchCity.value);
}

let searchInput = document.querySelector("#search-form");
searchInput.addEventListener("submit", search);
