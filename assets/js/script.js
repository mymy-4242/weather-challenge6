var searchFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector("#city");
var citiesContainerEl = document.querySelector("#cities-container");
var weatherContainerEl = document.querySelector("#weather-container");



var getWeather = function(city) {
    //format location url
    var locationApiUrl = "http://www.mapquestapi.com/geocoding/v1/address?key=ftSt4NSxqTDFY9VLMjMLaFYCt6ijP9Df&location=" + city;

    //fetch location
    fetch(locationApiUrl)
    .then(function(addressResponse) {
        return addressResponse.json();
    })
    .then(function(addressResponse) {
        //create variable to get longitude
        var lon = addressResponse.results[0].locations[0].latLng.lng;
        //create variable to get latitude
        var lat = addressResponse.results[0].locations[0].latLng.lat;

        //return fetch request to open weather API using longitude and latitude
        //format the weather url
        var weatherApiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=minutely,hourly&appid=6ce2fd47036a82a20821ae0d7d209616";
            
        return fetch(weatherApiUrl).then(function(weatherResponse) {
            return weatherResponse.json().then(function(data) {
                displayWeather(data, city);
                console.log(data);
            });
        });
    })
   
};

var formSubmitHandler = function(event) {
    event.preventDefault();
    
    //get value from form input
    var city = cityInputEl.value.trim();

    if (city) {
        getWeather(city);
        cityInputEl.value = "";
    } else {
        alert("Please enter a city!");
    }
};

var displayWeather = function(forecast, searchTerm) {
    //create a header element for each city searched
    var citySearchedEl = document.createElement("h2");
    citySearchedEl.classList = "list-item flex-row justify-space-between align-left";

    //create a span element to hold each city
    var cityEl = document.createElement("span");
    cityEl.textContent = searchTerm;

    citySearchedEl.appendChild(cityEl);
    citiesContainerEl.appendChild(citySearchedEl);

    //format weather title
    var weatherTitle = forecast.timezone + " (" + forecast.current.dt + ")" + forecast.current.weather[0].icon;

    //create weather card title
    var weatherTitleEl = document.createElement("h3");
    weatherTitleEl.classList = "card-header";
    weatherTitleEl.textContent = weatherTitle;

    //format current temp
    var tempCurrent = "Temperature: " + forecast.current.temp + "°F";
    //format current humidity
    var humidityCurrent = "Humidity: " + forecast.current.humidity + "%";
    //format current wind speed
    var windCurrent = "Wind Speed: " + forecast.current.wind_speed + " MPH";

    //create current weather card container
    var weatherCurrentEl = document.createElement("div");
    weatherCurrentEl.classList = "card-body";

    //create current weather card content
    var tempCurrentEl = document.createElement("p");
    tempCurrentEl.textContent = tempCurrent;
    var humidityCurrentEl = document.createElement("p");
    humidityCurrentEl.textContent = humidityCurrent;
    var windCurrentEl = document.createElement("p");
    windCurrentEl.textContent = windCurrent;

    //append current weather to card
    weatherCurrentEl.appendChild(tempCurrentEl);
    weatherCurrentEl.appendChild(humidityCurrentEl);
    weatherCurrentEl.appendChild(windCurrentEl);

    //append weather card to container
    weatherContainerEl.appendChild(weatherTitleEl);
    weatherContainerEl.appendChild(weatherCurrentEl);
};

searchFormEl.addEventListener("submit", formSubmitHandler);


