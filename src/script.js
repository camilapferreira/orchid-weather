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

  setValue("#current-temperature", Math.round(temperature));
  setValue("#api-humidity", humidity);
  setValue("#api-wind-speed", wind);
  setValue("#weather-status", description);
  let icon = elementById("#weather-icon");
  icon.src = imageIcon;

  //   console.log(response);
  //   let temperature = elementById("#current-temperature");
  //   temperature.innerHTML = Math.round(response.data.temperature.current);
  //   let humidity = elementById("#api-humidity");
  //   humidity.innerHTML = response.data.temperature.humidity;
  //   let windSpeed = elementById("#api-wind-speed");
  //   windSpeed.innerHTML = response.data.wind.speed;
  //   let condition = elementById("#weather-status");
  //   condition.innerHTML = response.data.condition.description;

  //   let imageUrl = response.data.condition.icon_url;
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
