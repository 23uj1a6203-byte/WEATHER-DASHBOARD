const apiKey = "YOUR_API_KEY_HERE";

async function getWeather() {

  let city = document.getElementById("city").value;
  let msg = document.getElementById("msg");

  msg.innerHTML = "";

  if (city === "") {
    msg.innerHTML = "Please enter city name";
    return;
  }

  try {

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    let res = await fetch(url);
    let data = await res.json();

    console.log(data);

    if (data.cod == 401) {
      msg.innerHTML = "Invalid API Key (check your key)";
      return;
    }

    if (data.cod == 404) {
      msg.innerHTML = "City not found";
      return;
    }

    document.getElementById("name").innerHTML = data.name;
    document.getElementById("temp").innerHTML = "Temperature: " + data.main.temp + "°C";
    document.getElementById("hum").innerHTML = "Humidity: " + data.main.humidity + "%";
    document.getElementById("wind").innerHTML = "Wind Speed: " + data.wind.speed + " m/s";

  } catch (error) {
    msg.innerHTML = "Network error. Try again later";
  }
}