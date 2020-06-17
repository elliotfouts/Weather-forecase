// ajax request to get current conditions
const getWeather = async (cityName) => {
	try {
		// retrieve data
		const weatherData = await $.ajax({
			url: `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=0472082bda1b802cb6c0a01644c95eb4`,
			method: 'GET'
		});
		const uvData = await getUVIndex(weatherData.coord.lat, weatherData.coord.lon);
		// render the dom
		populateWeatherData(weatherData, uvData.value);
	} catch (error) {
		alertUser('invalid city name');
		console.log(error);
	}
};

const getForecast = async (cityName) => {
	try {
		// retrieve information
		const forecastData = await $.ajax({
			url: `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=0472082bda1b802cb6c0a01644c95eb4`,
			method: 'GET'
		});
		// render dom
		populateForecastData(forecastData);
	} catch (error) {
		console.log(error);
	}
};

const searchCity = () => {
	let city = searchBarElement.val();
	getWeather(city);
	getForecast(city);
	searchBarElement.val('');
};

const getUVIndex = async (latitude, longitude) => {
	try {
		let data = await $.ajax({
			url:
				'https://api.openweathermap.org/data/2.5/uvi?lat=' +
				latitude +
				'&lon=' +
				longitude +
				'&appid=0472082bda1b802cb6c0a01644c95eb4',
			method: 'GET'
		});
		return data;
	} catch (error) {
		console.log(error);
	}
};
