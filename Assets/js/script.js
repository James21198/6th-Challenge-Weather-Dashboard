const WEATHER_API_BASE_URL = 'https://api.openweathermap.org';
const WEATHER_API_KEY = 'f23ee9deb4e1a7450f3157c44ed020e1';
const MAX_DAILY_FORECAST = 5;

const cityInput = document.querySelector (".city-input");
const searchButton = document.querySelector (".search-btn");

const getWeatherDetails = (cityName, lat, lon) => {
    var apiUrl = `${WEATHER_API_BASE_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${WEATHER_API_KEY}`;

    fetch(apiUrl).then(res => res.json()).then(data => {
        const uniqueForcastDays = [];

        const fiveDayForecast = data.list.filter(forecast => {
            const forecastDate = new Date(forecast.dt_txt).getDate();
            if(!uniqueForcastDays.includes(forecastDate)) {
                return uniqueForcastDays.push(forecastDate);
            }
        });

        console.log(fiveDayForecast);
    }).catch (() => {
        alert("An error has occurred whilst getting the weather forecast!");
    });
}

const getCityCoordinates = () => {
    const cityName = cityInput.value.trim();
    if (!cityName) return;
    
    var geoapiUrl = `${WEATHER_API_BASE_URL}/geo/1.0/direct?q=${cityName}&limit=5&appid=${WEATHER_API_KEY}`;;

    fetch (geoapiUrl).then(res => res.json()).then(data => {
        if(!data.length) return alert(`No coordinates found for ${cityName}`);
        const {name, lat, lon} = data[0];
        getWeatherDetails(name, lat, lon);
    }).catch (() => {
        alert("An error has occurred whilst trying to fetch your coordinates!");
    });
}

searchButton.addEventListener ("click", getCityCoordinates);