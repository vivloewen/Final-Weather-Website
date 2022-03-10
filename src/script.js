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
  let newIcons = [
    "img/cloud_flash.png", //0
    "img/cloud_rain.png", //1
    "img/cloud_snow.png", //2
    "img/cloud_sun.png", //3
    "img/cloud.png", //4
    "img/rain.png", //5
    "img/snow.png", //6
    "img/sunny.png", //7
  ];
  if ((weatherIcon = "01d" || "01n")) {
    currentIcon.setAttribute("src", newIcons[7]);
  } else {
    if ((weatherIcon = "02d" || "02n")) {
      currentIcon.setAttribute("src", newIcons[3]);
    } else {
      if ((weatherIcon = "03d" || "03n" || "04d" || "04n" || "50d" || "50n")) {
        currentIcon.setAttribute("src", newIcons[4]);
      } else {
        if ((weatherIcon = "09d" || "09n")) {
          currentIcon.setAttribute("src", newIcons[1]);
        } else {
          if ((weatherIcon = "10d" || "10n")) {
            currentIcon.setAttribute("src", newIcons[5]);
          } else {
            if ((weatherIcon = "11d" || "11n")) {
              currentIcon.setAttribute("src", newIcons[0]);
            } else {
              currentIcon.setAttribute("src", newIcons[6]);
            }
          }
        }
      }
    }
  }

  celsiusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
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
        <span class="day">${formatDay(forecastDay.dt)}</span>
        <br />
        <span class="icon">
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
function changeColorBlue(event) {
  event.preventDefault();

  document.getElementById("general-greeting").style.color = "cornflowerblue";
  document.getElementById("buttonSearch").style.background = "cornflowerblue";
  document.getElementById("buttonSearch").style.borderColor = "cornflowerblue";
  document.getElementById("currentCity").style.color = "cornflowerblue";
  document.getElementById("temperature").style.color = "cornflowerblue";
  document.getElementById("name").style.color = "cornflowerblue";
  document.getElementById("weather-forecast").style.color = "cornflowerblue";
  document.getElementById("background").style.background = "lightblue";
}

let colorElementBlue = document.querySelector(".blue");
colorElementBlue.addEventListener("click", changeColorBlue);

function changeColorPink(event) {
  event.preventDefault();

  document.getElementById("general-greeting").style.color = "palevioletred";
  document.getElementById("buttonSearch").style.background = "palevioletred";
  document.getElementById("buttonSearch").style.borderColor = "palevioletred";
  document.getElementById("currentCity").style.color = "palevioletred";
  document.getElementById("temperature").style.color = "palevioletred";
  document.getElementById("name").style.color = "palevioletred";
  document.getElementById("weather-forecast").style.color = "palevioletred";
  document.getElementById("background").style.background = "pink";
}
let colorElementPink = document.querySelector(".pink");
colorElementPink.addEventListener("click", changeColorPink);

function changeColorYellow(event) {
  event.preventDefault();

  document.getElementById("general-greeting").style.color = "goldenrod";
  document.getElementById("buttonSearch").style.background = "goldenrod";
  document.getElementById("buttonSearch").style.borderColor = "goldenrod";
  document.getElementById("currentCity").style.color = "goldenrod";
  document.getElementById("temperature").style.color = "goldenrod";
  document.getElementById("name").style.color = "goldenrod";
  document.getElementById("weather-forecast").style.color = "goldenrod";
  document.getElementById("background").style.background =
    "lightgoldenrodyellow";
}
let colorElementYellow = document.querySelector(".yellow");
colorElementYellow.addEventListener("click", changeColorYellow);

function changeColorGreen(event) {
  event.preventDefault();

  document.getElementById("general-greeting").style.color = "green";
  document.getElementById("buttonSearch").style.background = "green";
  document.getElementById("buttonSearch").style.borderColor = "green";
  document.getElementById("currentCity").style.color = "green";
  document.getElementById("temperature").style.color = "green";
  document.getElementById("weather-forecast").style.color = "green";
  document.getElementById("name").style.color = "green";
  document.getElementById("background").style.background = "#a1d1a1";
}
let colorElementGreen = document.querySelector(".green");
colorElementGreen.addEventListener("click", changeColorGreen);

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

let personalElement = document.querySelector("#personalize");
personalElement.addEventListener("click", addGreeting);

newCity("Bamberg");

let now = new Date();
changeGreeting(now.getHours());

//let apiUrlGeo = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=${apiKey}&units=metric`;
