const apiKey = '8b99c4bff6daea2e22ac162a45a4ecf3';

const locationInput = document.getElementById('location');
const getWeatherBtn = document.getElementById('getWeather');
const weatherDiv = document.getElementById('weather');
const loadingDiv = document.querySelector('.loading');

getWeatherBtn.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeatherData(location);
    } else {
        alert('Please enter a location');
    }
});

async function fetchWeatherData(location) {
    loadingDiv.style.display = 'block';
    weatherDiv.style.display = 'none';
    
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        if (data.cod === 200) {
            displayWeatherData(data);
        } else {
            alert('Location not found');
        }
    } catch (error) {
        alert('An error occurred while fetching weather data');
    }

    loadingDiv.style.display = 'none';
}

function displayWeatherData(data) {
    const { name, weather, main } = data;
    const { description, icon } = weather[0];
    const { temp, humidity } = main;

    weatherDiv.innerHTML = `
        <h2>${name}</h2>
        <p><img src="http://openweathermap.org/img/wn/${icon}.png" alt="${description}"> ${description}</p>
        <p>Temperature: ${temp}°C</p>
        <p>Humidity: ${humidity}%</p>
    `;
    weatherDiv.style.display = 'block';
}
