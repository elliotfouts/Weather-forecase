// ajax request to get current conditions
const getWeather = (cityName) => {
	$.ajax({
		url:
			'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=0472082bda1b802cb6c0a01644c95eb4',
		method: 'GET'
	})
		.then(async (data) => {
			const { coord } = data;
			let uvData = await getUVIndex(coord.lat, coord.lon);
			// render the dom
			populateWeatherData(data, uvData.value);
		})
		.catch((data) => {
			alertUser('invalid city name');
		});
};

const searchCity = () => {
	let city = searchBarElement.val();
	getWeather(city);
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
