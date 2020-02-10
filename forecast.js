var city = "los angeles";
var forecastArr = [];

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

    date1pre = forecastArr[0].dt_txt;
    date1 = date1pre.substring(5, 10);
    temp1 = forecastArr[0].main.temp;
    humidity1 = forecastArr[0].main.humidity;
    date2pre = forecastArr[1].dt_txt;
    date2 = date2pre.substring(5, 10);
    temp2 = forecastArr[1].main.temp;
    humidity2 = forecastArr[1].main.humidity;
    date3pre = forecastArr[2].dt_txt;
    date3 = date3pre.substring(5, 10);
    temp3 = forecastArr[2].main.temp;
    humidity3 = forecastArr[2].main.humidity;
    date4pre = forecastArr[3].dt_txt;
    date4 = date4pre.substring(5, 10);
    temp4 = forecastArr[3].main.temp;
    humidity4 = forecastArr[3].main.humidity;
    date5pre = forecastArr[4].dt_txt;
    date5 = date5pre.substring(5, 10);
    temp5 = forecastArr[4].main.temp;
    humidity5 = forecastArr[4].main.humidity;

    
});
