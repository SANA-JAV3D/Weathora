function getCity() {
  const city = document.getElementById("cityInput").value.trim();
  return city;
}

async function getWeather(event) {
  event.preventDefault(); // prevent form from submitting and refreshing the page

  const city = getCity();
  const resultBox = document.getElementById('temp');
  const humidityBox = document.getElementById('humidity');
  const windBox = document.getElementById('wind');
  const errorBox = document.querySelector('.errorMsg');

  resultBox.innerHTML = '-- °C';
  humidityBox.innerHTML = '-- %';
  windBox.innerHTML = '-- km/h';
  errorBox.textContent = '';

  const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${city}`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '6c2513c1cdmsh117c24ba78aa16cp12c51ejsn241e9ce448ba',
      'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    const temp = data.current.temp_c;
    const humidity = data.current.humidity;
    const wind = data.current.wind_kph;
    const location = data.location.name;

    resultBox.innerHTML = `${temp} °C`;
    humidityBox.innerHTML = `${humidity} %`;
    windBox.innerHTML = `${wind} km/h`;

  } catch (error) {
    console.error(error);
    errorBox.textContent = 'Failed to fetch weather data.';
  }
}
