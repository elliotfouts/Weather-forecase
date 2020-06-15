// main routine
$(document).ready(() => {
	// get current city
	let city = 'los angeles';
	// populate weather data
	getWeather(city);
  // add event listener to search bar
  $('#search-button').click(searchCity)
});


