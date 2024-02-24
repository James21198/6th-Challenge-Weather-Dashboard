const WEATHER_API_BASE_URL = 'https://api.openweathermap.org';
const WEATHER_API_KEY = 'f23ee9deb4e1a7450f3157c44ed020e1';
const MAX_DAILY_FORECAST = 5;

var locationEl = document.getElementById('location');
var searchButtonEl = document.getElementById('search');

function onClickSearch() {
    console.log('search button clicked');

    var locationName = locationEl.value;
    if (locationName) {
        locationLookup(locationName);
    }
    else {
        console.log('no location name');
    }
}

// Lookup the location to get the Lat/Lon
function locationLookup(location) {

    var apiUrl = `${WEATHER_API_BASE_URL}/geo/1.0/direct?q=${location}&limit=5&appid=${WEATHER_API_KEY}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {

            console.log(data);

            // Pick the First location from the results
            const location = data[0];
            var lat = data[0].lat;
            var lon = data[0].lon;

            // Get the Weather for the cached location
            var apiUrl = `${WEATHER_API_BASE_URL}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${WEATHER_API_KEY}`;
            
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {

                    console.log(data);

                    // Show the Current Weather Forecast
                    displayCurrentWeather(weatherData);

                    // Show the 5 Day Weather Forecast
                    displayWeatherForecast(weatherData.forecast);
                })
            })
}

function displayCurrentWeather(weatherData) {
    const currentWeather = weatherData.current;

    document.getElementById('temp_value').textContent = `${currentWeather.temp}°`;
    document.getElementById('wind_value').textContent = `${currentWeather.wind_speed}MPH`;
    document.getElementById('humid_value').textContent = `${currentWeather.humidity}%`;
    document.getElementById('uvi_value').textContent = `${currentWeather.uvi}`;
}

function displayWeatherForecast(weatherData) {
    for(let i = 0; i <MAX_DAILY_FORECAST; i++) {
        const dailyForecast = dailyData[i];
        console.log(dailyForecast);

        const listItem = document.createElement ('li');
        listItem.classList.add('forecast-item');
        listItem.innerHTML = `
            <div class="forecast-day">${day}</div>
            <div class="forecast-temp">${temp}</div>
            <div class="forecast-humidity">${humidity}</div>
            <div class="forecast-wind">${wind}</div>
        `;
        forecastList.appendChild(listItem);
    }
}

searchButtonEl.addEventListener('click', onClickSearch);
        