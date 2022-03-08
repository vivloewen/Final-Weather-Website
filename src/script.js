let city = "Hamburg";
let apiKey = "3f37b12f50b9244320e785a2fb791f14";
let apiUrlGeo = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=${apiKey}&units=metric`;
let apiUrlCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

function formatDate(timestamp) {
  let date = new Date(timestamp);

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
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
  return `${day}, ${hours}:${minutes}`;
}

function displayTemperature(response) {
  console.log(apiUrlCity);
  let cityElement = document.querySelector("#currentCity");
  cityElement.innerHTML = response.data.name;
  let descriptionElement = document.querySelector("#weatherDescription");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let currentDateElement = document.querySelector("#currentDate");
  currentDateElement.innerHTML = formatDate(response.data.dt * 1000);
}

axios.get(apiUrlCity).then(displayTemperature);
