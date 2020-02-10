// dom objects 
var searchContainerElement = $("#search-container");
var dateAndPlaceElement = $("#date-place-container");
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
var city = "los angeles";
var currentDate = moment().format('MMMM Do YYYY');
var currentWeather = 0;
var currentIcon;
var currentTemp;
var currentHumidity;
var currentWindspeed;
var currentUvIndex;
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
    } 
});

var searchTerm;
// grabs search conditions 
$(".fa-search").click(function() {
    searchTerm = $("#searchbar-input").val();
    updateCurrent(searchTerm);
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

        console.log(currentWeather);
    
        // changes animation based on weather / location
        rainOn = false;
        snowOn = false;
        $("#sun").removeClass();
        $("#clouds").removeClass();
        $("#clouds2").removeClass();
        $("canvas").attr("style", "background: #0095da;")
        $("body").attr("style", "color: #444;")
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
        } 
    });
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

//changes animation based on forecast 
