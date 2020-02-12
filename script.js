// dom objects 
var searchContainerElement = $("#search-container");
var dateAndPlaceElement = $("#date-place-container");
var nameElement = $("#name");
var dateElement = $("#date");
var titleContainerElement = $("#title-container");
var titleElement = $("#title");
var searchbarContainerElement = $("#searchbar-container");
var searcbarElement = $("#searchbar");
var searchbarInput = $("#searchbar-input");
var recentSearchesBtnElement = $("#recent-searches-button");
var forecastBtnElement = $("#forecast-button");
var recentSearchContainer = $(".recent-search-actual-container");
// variables to store weather data
var city = "los angeles";
var currentDate = moment().format('MMMM Do YYYY');
var currentWeather = 0;
var currentIcon;
var currentTempKelvin;
var currentTemp;
var currentHumidity;
var currentWindspeed;
var currentUvIndex;
var oneDayAhead;
var twoDaysAhead;
var threeDaysAhead;
var fourDaysAhead;
var fiveDaysAhead;
var latitude;
var longitude;
localStorage.setItem("city", "los angeles")
var recentSearches = JSON.parse(localStorage.getItem("cityArr"));
if (recentSearches == null) {
    recentSearches = [];
}

var newSearchElement;
// updates recent searches

for (var i = recentSearches.length - 1; i > 0; i--) {        
    newSearchElement = $("<h2>");
    newSearchElement.addClass("recent-search");
    newSearchElement.text(recentSearches[i]);
    recentSearchContainer.append(newSearchElement)
}

// updates conditions 
conditionsArr = $(".conditions");
var tempDisplay = conditionsArr.eq(0);
var humidityDisplay = conditionsArr.eq(1);
var windspeedDisplay = conditionsArr.eq(2);
var uvIndexDisplay = conditionsArr.eq(3);

// grabs current conditions
$.ajax ({
    url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=0472082bda1b802cb6c0a01644c95eb4",
    method: "GET"
}).then (function (response) {   
    currentName = response.name;
    currentWeather = response.weather[0].description;
    currentIcon = response.weather[0].icon;
    currentTempKelvin = response.main.temp;
    currentTemp = Math.floor((currentTempKelvin * (9/5)) - 459.67);
    currentHumidity = response.main.humidity;
    currentWindspeed = response.wind.speed;
    currentUvIndex;   
    longitude = response.coord.lon;
    latitude = response.coord.lat;

    console.log(currentWeather);
    // updates initial location weather
    nameElement.text(currentName);
    dateElement.text(currentDate);

    // updates conditions 
    tempDisplay.text(currentTemp + "°F");
    humidityDisplay.text("humidity: " + currentHumidity + "%");
    windspeedDisplay.text("wind: " + currentWindspeed + "mph");

    // changes animation based on weather / location
    rainOn = false;
    snowOn = false;
    $("#sun").removeClass();
    $("#clouds").removeClass();
    $("#clouds2").removeClass();
    if (currentWeather == "light rain" || currentWeather == "	light intensity drizzle" || currentWeather == "drizzle" || currentWeather == "heavy intensity drizzle" || currentWeather == "light intensity drizzle rain" || currentWeather == "drizzle rain" || currentWeather == "heavy intensity drizzle rain" || currentWeather == "shower rain and drizzle" || currentWeather == "heavy shower rain and drizzle" || currentWeather == "shower drizzle" || currentWeather == "light rain" || currentWeather == "moderate rain" || currentWeather == "heavy intensity rain" || currentWeather == "very heavy rain" || currentWeather == "extreme rain" || currentWeather == "freezing rain" || currentWeather == "light intensity shower rain" || currentWeather == "shower rain" || currentWeather == "heavy intensity shower rain" || currentWeather == "ragged shower rain") {
        rainOn = true;
        rainAnimation();
        $("canvas").attr("style", "background: #00496b;")
        $("body").attr("style", "color: #fff;")
    } else if (currentWeather == "light snow" || currentWeather == "Snow" || currentWeather == "Heavy snow" || currentWeather == "Sleet" || currentWeather == "Light shower sleet" || currentWeather == "Shower sleet" || currentWeather == "Light rain and snow" || currentWeather == "Rain and snow" || currentWeather == "Light shower snow" || currentWeather == "Shower snow" || currentWeather == "Heavy shower snow") {
        snowOn = true;
        animateSnow();
    } else if (currentWeather == "broken clouds" || currentWeather == "few clouds" || currentWeather == "scattered clouds" || currentWeather == "overcast clouds") {
        $("#clouds").addClass("clouds");
        $("#clouds2").addClass("clouds2");
    } else if (currentWeather == "clear sky") {
        $("#sun").addClass("sun");
        console.log("Clear sky")
    } else {
        $(".icon").attr("src", "http://openweathermap.org/img/wn/" + currentIcon + "@2x.png");
        console.log("hello")
    }

    // get UV index
    $.ajax ({
        url: "https://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=0472082bda1b802cb6c0a01644c95eb4",
        method: "GET"
    }).then (function (response) {
        currentUvIndex = response.value;

        uvIndexDisplay.text("UV Index: " + currentUvIndex);
    })
});


// opens and updates recent searches 

recentSearchesBtnElement.click(function(){
    $(".recent-search-container").addClass("open");
})

$(".recent-search-close").click(function(){
    $(".recent-search-container").removeClass("open"); 
})


// grabs search conditions 
var searchTerm;
$(".fa-search").click(function() {
    searchTerm = $("#searchbar-input").val();
    if (searchTerm == ""){
        return;
    }
    localStorage.setItem("city", searchTerm);
    recentSearches.push(searchTerm);
    while (recentSearches.length > 8) {
        recentSearches.shift()
    }
    console.log(recentSearches)
    localStorage.setItem("cityArr", JSON.stringify(recentSearches));
    updateCurrent(searchTerm);
    $("#searchbar-input").val("");

    // updates recent searches 
    $(".recent-search-actual-container").empty();
    for (var i = recentSearches.length - 1; i > 0; i--) {        
        newSearchElement = $("<h2>");
        newSearchElement.addClass("recent-search");
        newSearchElement.text(recentSearches[i]);
        recentSearchContainer.append(newSearchElement)
    }
})

// searches recent search 
recentSearchContainer.click(function(event) {
    var recentSearchElements = $(".recent-search");
    var target = event.target;
    for (var i = 0; i < recentSearchElements.length; i++) {
        if (event.target == recentSearchElements[i]) {
            updateCurrent(target.innerText)
            $(".recent-search-container").removeClass("open"); 
        }
    }
})



function updateCurrent(cityUpdate) {

    $.ajax ({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + cityUpdate + "&appid=0472082bda1b802cb6c0a01644c95eb4",
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
    
        // changes animation based on weather / location
        rainOn = false;
        snowOn = false;
        $("#sun").removeClass();
        $("#clouds").removeClass();
        $("#clouds2").removeClass();
        $("canvas").attr("style", "background: #0095da;")
        $("body").attr("style", "color: #444;")
        if (currentWeather == "light rain" || currentWeather == "light intensity drizzle" || currentWeather == "drizzle" || currentWeather == "heavy intensity drizzle" || currentWeather == "light intensity drizzle rain" || currentWeather == "drizzle rain" || currentWeather == "heavy intensity drizzle rain" || currentWeather == "shower rain and drizzle" || currentWeather == "heavy shower rain and drizzle" || currentWeather == "shower drizzle" || currentWeather == "light rain" || currentWeather == "moderate rain" || currentWeather == "heavy intensity rain" || currentWeather == "very heavy rain" || currentWeather == "extreme rain" || currentWeather == "freezing rain" || currentWeather == "light intensity shower rain" || currentWeather == "shower rain" || currentWeather == "heavy intensity shower rain" || currentWeather == "ragged shower rain") {
            rainOn = true;
            rainAnimation();
            $("canvas").attr("style", "background: #00496b;")
            $("body").attr("style", "color: #fff;")
        } else if (currentWeather == "light snow" || currentWeather == "Snow" || currentWeather == "Heavy snow" || currentWeather == "Sleet" || currentWeather == "Light shower sleet" || currentWeather == "Shower sleet" || currentWeather == "Light rain and snow" || currentWeather == "Rain and snow" || currentWeather == "Light shower snow" || currentWeather == "Shower snow" || currentWeather == "Heavy shower snow") {
            snowOn = true;
            animateSnow();
        } else if (currentWeather == "broken clouds" || currentWeather == "few clouds" || currentWeather == "scattered clouds" || currentWeather == "overcast clouds") {
            $("#clouds").addClass("clouds");
            $("#clouds2").addClass("clouds2");
        } else if (currentWeather == "clear sky") {
            $("#sun").addClass("sun");
        } else {
            $(".icon").attr("src", "http://openweathermap.org/img/wn/" + currentIcon + "@2x.png");
        }
    });
}


// animations

var canvas = document.querySelector("canvas");
screenHeight = window.innerHeight;
screenWidth = window.innerWidth;
canvas.height = screenHeight;
canvas.width = screenWidth;
ctx = canvas.getContext('2d');

// snow particles 
var snowArr = [];
var snowAnimationFrame;
var snowOn = false;
function SnowParticle(x, y, dy, radius, opacity) {
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.radius = radius;
    this.opacity;
    this.color = "rgba(255, 255, 255," + opacity + ")";

    this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.strokeStyle = this.color;
        ctx.stroke();
        ctx.fillStyle = this.color;
        ctx.fill();
        // update()
    }

    this.update = function () {
        this.y += dy;
        this.draw();

        if (this.y > screenHeight) {
            this.y = 0;
            this.x = Math.random() * screenWidth;
        }
    }
}

for (var i = 0; i < 500; i++) {
    var x = Math.random() * screenWidth;
    var y = Math.random() * screenHeight;
    var dy = 3;
    var radius = Math.random() * 2;
    var opacity = radius * 40;

    snowArr.push(new SnowParticle(x, y, dy, radius, opacity));
}

function animateSnow() {
    snowAnimationFrame = requestAnimationFrame(animateSnow);
    ctx.clearRect(0, 0, screenWidth, screenHeight);

    for (var i = 0; i < snowArr.length; i++) {
        snowArr[i].update();
    }

    if (snowOn == false) {
        window.cancelAnimationFrame(snowAnimationFrame);
        ctx.clearRect(0, 0, screenWidth, screenHeight);
    }
}
animateSnow()

// rain drops

var rainArr = [];
var rainAnimationFrame;
var rainOn = false;
function RainDrop(x, y, dy, width, height, opacity) {
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.width = width;
    this.height = height;
    this.opacity;
    this.color = "rgba(160, 160, 160," + opacity + ")";

    this.draw = function () {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        // update()
    }

    this.update = function () {
        this.y += this.dy;
        
        if (this.y > screenHeight) {
            this.y = 0;
            this.x = Math.random() * screenWidth;
        }
        this.draw();
    }
}

for (var i = 0; i < 500; i++) {
    var x = Math.random() * screenWidth;
    var y = Math.random() * screenHeight;
    var width = height / 10;
    var height = Math.random() * 20;
    var dy = height / 4 + 7 ;
    var opacity = height * 10;
    rainArr.push(new RainDrop(x, y, dy, width, height, opacity))
}

function rainAnimation () {
    var rainAnimationFrame = requestAnimationFrame(rainAnimation);
    ctx.clearRect(0, 0, screenWidth, screenHeight);
    for (i = 0; i < rainArr.length; i++) {
        rainArr[i].update();
    }

    if (rainOn == false) {
        window.cancelAnimationFrame(rainAnimationFrame);
        ctx.clearRect(0, 0, screenWidth, screenHeight);
    }
}
rainAnimation();
