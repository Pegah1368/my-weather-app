function showWeather(response) {
  let main = response.data.main;
  let temperature = Math.round(main.temp);
  let h1 = document.querySelector("h1");
  let city = response.data.name;
  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = main.humidity;
  let wind = document.querySelector(".wind");
  wind.innerHTML = response.data.wind.speed;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  let feelsLike = document.querySelector(".feels-like");
  feelsLike.innerHTML = Math.round(main.feels_like);
  h1.innerHTML = `${city}`;
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = Math.round(response.data.main.temp);
}
function getWeather(city) {
  let apiKey = "5057d48b02a6aea197a7f37d83ba709c";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}
function retrievePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "5057d48b02a6aea197a7f37d83ba709c";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showWeather);
}
function getCurrentlocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentlocation);
function formatDate(date) {
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
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0 ${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}  ${hours} : ${minutes}`;
}
let currentTime = new Date();
let dateElement = document.querySelector("#current-time");
dateElement.innerHTML = formatDate(currentTime);

function changeCity(e) {
  e.preventDefault();
  let city = document.querySelector("#city");
  let searchCity = document.querySelector("#search-city");
  city.innerHTML = `${searchCity.value}`;
  getWeather(searchCity.value);
}
let form = document.querySelector(".search-form");
form.addEventListener("submit", changeCity);
