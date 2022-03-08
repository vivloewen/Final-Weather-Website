let city = "Hamburg";
let apiKey = "3f37b12f50b9244320e785a2fb791f14";
let apiUrlGeo = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=${apiKey}&units=metric`;
let apiUrlCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

function displayTemperature(response) {
  console.log(response.data);
}

axios.get(apiUrlCity).then(displayTemperature);
