var searchFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector("#city");
var citiesContainerEl = document.querySelector("#cities-container");
var weatherContainerEl = document.querySelector("#weather-container");

var getWeather = function(city) {
    //format the weather url
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&cnt=6&appid=6ce2fd47036a82a20821ae0d7d209616";
    
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            displayWeather(data, city);
            console.log(data);
        });
    });
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

    //create a div for the forecast
    //var forecastEl = forecast.list[0].main.temp + "/" + forecast.list[0].main.humidity + "/" + forecast.list[0].wind.speed;

    //create weather card
    var forecastContainerEl = document.createElement("card");

    //format weather title
    var weatherTitle = forecast.city.name + " (" + forecast.list[0].dt_txt + ")";

    //create weather card title
    var weatherTitleEl = document.createElement("h3");
    weatherTitleEl.classList = "card-header";
    weatherTitleEl.textContent = weatherTitle;


    forecastContainerEl.appendChild(weatherTitleEl);


    //forecastContainerEl.value = forecastEl;
    weatherContainerEl.appendChild(forecastContainerEl);
    
};

searchFormEl.addEventListener("submit", formSubmitHandler);


