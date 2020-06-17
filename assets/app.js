// main routine
$(document).ready(() => {
	// get current city
	let city = 'los angeles';
	// populate weather data
	getWeather(city);
	getForecast(city);
  // add event listener to search bar
	$('#search-button').click(searchCity);
	// add event listener to forecast button
	$('#display-forecast').click(displayForecast);
	// add event listener to current button
	$('#display-current').click(displayCurrent);
});


