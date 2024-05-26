document.addEventListener('DOMContentLoaded', () => {
    const fetchWeatherButton = document.getElementById('fetch-weather');
    const locationInput = document.getElementById('location-input');
    const weatherContainer = document.getElementById('weather-container');
    const locationName = document.getElementById('location-name');
    const weatherReport = document.getElementById('weather-report');

    fetchWeatherButton.addEventListener('click', () => {
        const location = locationInput.value;
        if (location) {
            fetchWeatherData(location);
        }
    });

    function fetchWeatherData(location) {
        const apiKey = '3bb6d1afd9800518747b8ae0447f4b44';
        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.cod === "200") {
                    displayWeatherData(data);
                } else {
                    alert('Location not found. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                alert('Error fetching weather data. Please try again later.');
            });
    }

    function displayWeatherData(data) {
        locationName.textContent = data.city.name;
        weatherReport.innerHTML = '';

        const today = new Date().toDateString();
        const todayForecasts = data.list.filter(item => new Date(item.dt_txt).toDateString() === today);

        todayForecasts.forEach(forecast => {
            const card = document.createElement('div');
            card.className = 'weather-card';

            const time = new Date(forecast.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const description = forecast.weather[0].description;
            const temp = forecast.main.temp;
            const humidity = forecast.main.humidity;

            card.innerHTML = `
                <h3>${time}</h3>
                <p>Weather: ${description}</p>
                <p>Temperature: ${temp} °C</p>
                <p>Humidity: ${humidity}%</p>
            `;

            weatherReport.appendChild(card);
        });

        weatherContainer.style.display = 'block';
    }
});
