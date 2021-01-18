var searchFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector("#city");
var citiesContainerEl = document.querySelector("#cities-container");
var weatherContainerEl = document.querySelector("#weather-container");
var forecastContainerEl = document.querySelector("#day-container");


var getWeather = function(city) {
    //format location url
    var locationApiUrl = "https://www.mapquestapi.com/geocoding/v1/address?key=ftSt4NSxqTDFY9VLMjMLaFYCt6ijP9Df&location=" + city;

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

    localStorage.setItem("past-search", city);

};

var buttonSubmitHandler = function(event) {
    localStorage.getItem("past-search", JSON.stringify(city));
    getWeather(city);
}

var displayWeather = function(forecast, searchTerm) {
    weatherContainerEl.textContent = "";
    forecastContainerEl.textContent = "";

    //create a header element for each city searched
    var citySearchedEl = document.createElement("button");
    citySearchedEl.classList = "btn btn-block justify-space-between align-left";
    citySearchedEl.id = "searchTerm";
    citySearchedEl.addEventListener("click", buttonSubmitHandler);


    //create a span element to hold each city
    var cityEl = document.createElement("span");
    cityEl.textContent = searchTerm;

    citySearchedEl.appendChild(cityEl);
    citiesContainerEl.appendChild(citySearchedEl);

    //format date
    var timestamp = forecast.current.dt;
    var dateObject = new Date(timestamp);
    var date = dateObject.toLocaleString();
    //format weather title
    var weatherTitle = searchTerm + " (" + date + ")" + forecast.current.weather[0].icon;

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
    //format current uv index
    var uvCurrentVal = document.createElement("span")
    uvCurrentVal.textContent = forecast.current.uvi;
        if (uvCurrentVal >= 6) {
            uvCurrentVal.addClass = "severe";
        } else if (uvCurrentVal >= 3) {
            uvCurrentVal.addClass = "moderate";
        } else {
            uvCurrentVal.addClass = "favorable";
        }
    var uvCurrent = "UV index: " + uvCurrentVal;

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
    //create uv content and color box
    var uvCurrentEl = document.createElement("p");
    uvCurrentEl.textContent = uvCurrent;

    //append current weather to card
    weatherCurrentEl.appendChild(tempCurrentEl);
    weatherCurrentEl.appendChild(humidityCurrentEl);
    weatherCurrentEl.appendChild(windCurrentEl);
    weatherCurrentEl.appendChild(uvCurrentEl);

    //append weather card to container
    weatherContainerEl.appendChild(weatherTitleEl);
    weatherContainerEl.appendChild(weatherCurrentEl);

    //create 5 day forecast content
    //create 5 day forecast header and body
    var daysTitle = "5-Day Forecast:";
    var daysContainerTitle = document.createElement("h3");
    daysContainerTitle.textContent = daysTitle;
    var daysContainerBody = document.createElement("div");
    daysContainerBody.classList = "row";

    //append 5 day forecast header  and body to container
    forecastContainerEl.appendChild(daysContainerTitle);

    //loop over next 5 days
    for (var i=0; i < 5; i++) {
        //format date
        var timestampForecast = forecast.daily[i].dt;
        var dateForecastObject = new Date(timestampForecast);
        var dateForecast = dateForecastObject.toLocaleString();
        //format weather icon
        var iconForecast = forecast.daily[i].weather[0].icon;
        var iconUrl = "https://openweathermap.org/img/wn/" + iconForecast + "@2x.png";
        //format temp
        var tempForecast = "Temp: " + forecast.daily[i].temp.day + "°F";
        //format humidity
        var humidityForecast = "Humidity: " + forecast.daily[i].humidity + "%";

        //create content for each forecast card
        var dateForecastEl = document.createElement("h4");
        dateForecastEl.textContent = dateForecast;
        var iconForecastEl = document.createElement("p");
        iconForecastEl.value = iconUrl;
        var tempForecastEl = document.createElement("p");
        tempForecastEl.textContent = tempForecast;
        var humidityForecastEl = document.createElement("p");
        humidityForecastEl.textContent = humidityForecast;

        //create a card for each forecast day
        var forecastEl = document.createElement("card");

        //create a column for each card
        var forecastColEl = document.createElement("div");
        forecastColEl.classList = "col-auto forecast m-2";

        forecastEl.appendChild(dateForecastEl);
        forecastEl.appendChild(iconForecastEl);
        forecastEl.appendChild(tempForecastEl);
        forecastEl.appendChild(humidityForecastEl);

        forecastColEl.appendChild(forecastEl);
        daysContainerBody.appendChild(forecastColEl);

    }

    forecastContainerEl.appendChild(daysContainerBody);
};


searchFormEl.addEventListener("submit", formSubmitHandler);


