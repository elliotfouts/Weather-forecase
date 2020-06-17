// DOM elements
const searchBarElement = $('#search-input');
const temperatureElement = $('#temperature');
const humidityElement = $('#humidity');
const windSpeedElement = $('#wind');
const uvIndexElement = $('#uv-index');
const cityNameElement = $('#city-name');
const dateElement = $('#date');
const forecastDateArr = $('.forecast-date');
const forecastTemperatureArr = $('.forecast-temperature');
const forecastHumidityArr = $('.forecast-humidity');
const forecastDescriptionArr = $('.forecast-description');
const currentDataElement = $('#data-current');
const forecastDataElement = $('#data-forecast');

async function populateWeatherData(data, uvIndex) {
	// extract data from ajax response
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

const populateForecastData = async (data) => {
	const { list } = data;
	console.log(list);
	console.log(forecastDateArr);
	console.log(forecastTemperatureArr);
	console.log(forecastHumidityArr);
	// for each forecast day
	for (let i = 0; i < 3; i++) {
		// set date
		forecastDateArr[i].innerText = formatDate(list[i * 8].dt_txt);
		// set weather
		forecastDescriptionArr[i].innerText = list[i * 8].weather[0].description;
		// set temperature
		let tempKelvin = list[i * 8].main.temp;
		forecastTemperatureArr[i].innerText = Math.floor(tempKelvin * (9 / 5) - 459.67);
		// set humidity
		forecastHumidityArr[i].innerText = list[i * 8].main.humidity;
	}
};

const alertUser = (message) => {
	const alert = `<div class="alert alert-danger alert-dismissible fade hide"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>Error!</strong> <span id="alert-message">${message}</span></div>`;
	$('main').append(alert);
	$('.alert').addClass('show');
};

const displayForecast = () => {
	currentDataElement.css('display', 'none');
	forecastDataElement.css('display', 'block');
};

const displayCurrent = () => {
	currentDataElement.css('display', 'block');
	forecastDataElement.css('display', 'none');
};

const formatDate = (unformattedDate) => {
	let dateParts = unformattedDate.split('-');
	console.log(dateParts);
	return `${dateParts[1]} / ${dateParts[2].split(' ')[0]}`;
};
