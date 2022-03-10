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

function searchCity(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#cityName");
  newCity(cityElement.value);
}

function newCity(city) {
  let apiKey = "3f37b12f50b9244320e785a2fb791f14";
  let apiUrlCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlCity).then(displayTemperature);
}

function displayTemperature(response) {
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
  let currentIcon = document.querySelector("#currentIcon");
  let weatherIcon = response.data.weather[0].icon;
  currentIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`
  );
  celsiusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}

function showFahrenheit(event) {
  event.preventDefault();
  let celsiusElement = document.querySelector("#temperature");
  let fahrenheit = (celsiusTemperature * 9) / 5 + 32;
  celsiusElement.innerHTML = Math.round(fahrenheit);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function showCelsius(event) {
  event.preventDefault();
  let fahrenheitElement = document.querySelector("#temperature");
  fahrenheitElement.innerHTML = Math.round(celsiusTemperature);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

function getForecast(coordinates) {
  let apiKey = "3f37b12f50b9244320e785a2fb791f14";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = "";
  forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6 && index >= 1) {
      forecastHTML =
        forecastHTML +
        `<div class="col forecastDays">
        <span class="dayOne">${formatDay(forecastDay.dt)}</span>
        <br />
        <span class="icon" id="iconOne">
        <img src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png" alt="Sunny" id="forecastIcon" />
        </span>
        <br />
        <span class="max">${Math.round(
          forecastDay.temp.max
        )}°</span> <span class="min">${Math.round(forecastDay.temp.min)}°</span>
    </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function addGreeting(event) {
  event.preventDefault();
  let name = prompt("What is your name?");
  let newName = document.querySelector("#name");
  newName.innerHTML = `, ${name}!`;
}

function changeGreeting(daytime) {
  let greeting = document.querySelector("#greeting");
  if (daytime < 12) {
    greeting.innerHTML = "Good morning";
  } else {
    if (daytime >= 12 && daytime < 18) {
      greeting.innerHTML = "Good afternoon";
    } else {
      greeting.innerHTML = "Good evening";
    }
  }
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsius);

let personalElement = document.querySelector("#personalize");
personalElement.addEventListener("click", addGreeting);

newCity("Bamberg");

let now = new Date();
changeGreeting(now.getHours());

//let apiUrlGeo = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=${apiKey}&units=metric`;

// <div class="row">
//<div class="col forecastDays">
// <span class="dayOne">Tue</span>
// <br />
// <span class="icon" id="iconOne">
//   <img src="img/rain.png" alt="Sunny" id="forecastIcon" />
// </span>
// <br />
// <span class="max">3°</span> <span class="min">1°</span>
//</div>;
