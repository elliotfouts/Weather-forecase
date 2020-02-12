var city = localStorage.getItem("city");
var forecastArr = [];
var dateArr = [];
var tempArr = [];
var humidityArr = [];
var iconArr = [];
var cardArr = $(".card");
var dateDisplayArr = $(".date");
var tempDisplayArr = $(".temperature");
var humidityDisplayArr = $(".humidity");
var iconDisplay = $(".icon");

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
    
    console.log(forecastArr[0].weather[0].icon);

    date1pre = forecastArr[0].dt_txt;
    date1 = date1pre.substring(5, 10);
    temp1kelvin = forecastArr[0].main.temp;
    temp1 = Math.floor((temp1kelvin * (9/5)) - 459.67);
    humidity1 = forecastArr[0].main.humidity;
    icon1 = forecastArr[0].weather[0].icon
    date2pre = forecastArr[1].dt_txt;
    date2 = date2pre.substring(5, 10);
    temp2kelvin = forecastArr[1].main.temp;
    temp2 = Math.floor((temp2kelvin * (9/5)) - 459.67);
    humidity2 = forecastArr[1].main.humidity;
    icon2 = forecastArr[1].weather[0].icon
    date3pre = forecastArr[2].dt_txt;
    date3 = date3pre.substring(5, 10);
    temp3kelvin = forecastArr[2].main.temp;
    temp3 = Math.floor((temp3kelvin * (9/5)) - 459.67);
    humidity3 = forecastArr[2].main.humidity;
    icon3 = forecastArr[2].weather[0].icon
    date4pre = forecastArr[3].dt_txt;
    date4 = date4pre.substring(5, 10);
    temp4kelvin = forecastArr[3].main.temp;
    temp4 = Math.floor((temp4kelvin * (9/5)) - 459.67);
    humidity4 = forecastArr[3].main.humidity;
    icon4 = forecastArr[3].weather[0].icon
    date5pre = forecastArr[4].dt_txt;
    date5 = date5pre.substring(5, 10);
    temp5kelvin = forecastArr[4].main.temp;
    temp5 = Math.floor((temp5kelvin * (9/5)) - 459.67);
    humidity5 = forecastArr[4].main.humidity;
    icon5 = forecastArr[4].weather[0].icon

    dateArr.push(date1);
    dateArr.push(date2);
    dateArr.push(date3);
    dateArr.push(date4);
    dateArr.push(date5);
    tempArr.push(temp1);
    tempArr.push(temp2);
    tempArr.push(temp3);
    tempArr.push(temp4);
    tempArr.push(temp5);
    humidityArr.push(humidity1);
    humidityArr.push(humidity2);
    humidityArr.push(humidity3);
    humidityArr.push(humidity4);
    humidityArr.push(humidity5);
    iconArr.push(icon1)
    iconArr.push(icon2)
    iconArr.push(icon3)
    iconArr.push(icon4)
    iconArr.push(icon5)
    
    // if (icon == "200" || icon == "201" || icon == "" || icon == "" || icon == "" || icon == "" || icon == "" || icon == "" || icon == "" || icon == "")

    for (var i = 0; i < cardArr.length; i++) {
        dateDisplayArr.eq(i).text(dateArr[i]);
        tempDisplayArr.eq(i).text(tempArr[i] + "°F");
        humidityDisplayArr.eq(i).text("humidity: " + humidityArr[i] + "%");
        iconDisplay.eq(i).attr("src", "http://openweathermap.org/img/wn/" + iconArr[i] + "@2x.png")
    }



});


// updates icon 

