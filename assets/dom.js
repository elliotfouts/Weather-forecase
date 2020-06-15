// DOM elements
const searchBarElement = $('#search-input');
const temperatureElement = $('#temperature');
const humidityElement = $('#humidity');
const windSpeedElement = $('#wind');
const uvIndexElement = $('#uv-index');
const cityNameElement = $('#city-name');
const dateElement = $('#date');

async function populateWeatherData(data, uvIndex) {
	// extract data from ajax response
	console.log(data);
	const { name: cityName, weather, main, wind } = data;
	const description = weather[0].description;
	const icon = weather[0].icon;
	const { temp, humidity, feels_like } = main;
	const temperature = Math.floor(temp * (9 / 5) - 459.67);
	const feelsLike = Math.floor(feels_like * (9 / 5) - 459.67);
	const windSpeed = wind.speed;
	const date = moment().format('MMMM Do');
	// populate elements
	temperatureElement.text(`${temperature}˚ but it feels like ${feelsLike}˚`);
	humidityElement.text(humidity);
	windSpeedElement.text(windSpeed);
	cityNameElement.text(cityName);
	uvIndexElement.text(uvIndex);
	dateElement.text(date);
	// animate background
	animateBackground(description, icon);
	// get UV index
}

const alertUser = (message) => {
	const alert = `<div class="alert alert-danger alert-dismissible fade hide"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>Error!</strong> <span id="alert-message">${message}</span></div>`;
	$('main').append(alert);
	$('.alert').addClass('show');
};
