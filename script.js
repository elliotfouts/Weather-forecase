// dom objects 
var searchContainerElement = $("#search-container");
var topRowElement = $("#top-row");
var nameElement = $("#name");
var dateElement = $("#date");
var titleContainerElement = $("#title-container");
var titleElement = $("#title");
var subtitleElement = $("#subtitle");
var searchbarContainerElement = $("#searchbar-container");
var searcbarElement = $("#searchbar");
var searchbarInput = $("#searchbar-input");
var recentSearchesBtnElement = $("#recent-searches-button");
// variables to store weather data
var city = "Los Angeles";
var currentDate = moment().format('MMMM Do YYYY');
var currentWeather;
var currentIcon;
var currentTemp;
var currentHumidity;
var currentWindspeed;
var currentUvIndex;
var forecastArr = [];
var oneDayAhead;
var twoDaysAhead;
var threeDaysAhead;
var fourDaysAhead;
var fiveDaysAhead;

// grabs current conditions
$.ajax ({
    url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=0472082bda1b802cb6c0a01644c95eb4",
    method: "GET"
}).then (function (response) {   
    currentName = response.name;
    currentWeather = response.weather[0].description;
    currentIcon = response.weather[0].icon;
    currentTemp = response.main.temp;
    currentHumidity = response.main.humidity;
    currentWindspeed = response.wind.speed;
    currentUvIndex;   
    
    
    // updates initial location weather
    nameElement.text(currentName);
    dateElement.text(currentDate);
});


// grabs forecast conditions
$.ajax ({
    url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=0472082bda1b802cb6c0a01644c95eb4",
    method: "GET"
}).then(function(response){
    forecastArr[0] = response.list[4];
    forecastArr[1] = response.list[12];
    forecastArr[2] = response.list[20];
    forecastArr[3] = response.list[28];
    forecastArr[4] = response.list[36];
});

function updateCurrent() {

}

function updateForecast() {
    var weather;
    var humidity;
    var icon;
    var temp;
    var windspeed;
    var uvIndex
    for (var i = 0; i < forecastArr.length; i++) {
        weather = forecastArr[i].weather[0].description;
        humidity = forecastArr[i].main.humidity;
        temp = forecastArr[i].main.temp;
        windspeed = forecastArr[i].wind.speed;
        uvIndex;


    }
}