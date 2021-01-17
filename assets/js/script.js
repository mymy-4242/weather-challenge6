var searchFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector("#city");
var citiesContainerEl = document.querySelector("#cities-container");

var getWeather = function(city) {
    //format the weather url
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&cnt=5&appid=6ce2fd47036a82a20821ae0d7d209616";
    
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            displayWeather(data, city);
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
}

searchFormEl.addEventListener("submit", formSubmitHandler);


