let rainOn = false;
let snowOn = false;
const animateBackground = (currentWeather, icon) => {
	$('#sun').removeClass();
	$('#clouds').removeClass();
	$('#clouds2').removeClass();
	switch (currentWeather) {
		case 'clear sky': {
			$('canvas').attr('style', 'background: #0095d;');
			$('#sun').addClass('sun');
			break;
		}
		case 'broken clouds':
		case 'few clouds':
		case 'scattered clouds':
		case 'overcast clouds': {
			$('canvas').attr('style', 'background: #0095d;');
			$('#clouds').addClass('clouds');
			$('#clouds2').addClass('clouds2');
			break;
		}
		case 'light snow':
		case 'Snow':
		case 'Heavy snow':
		case 'Sleet':
		case 'Light shower sleet':
		case 'Shower sleet':
		case 'Light rain and snow':
		case 'Rain and snow':
		case 'Light shower snow':
		case 'Shower snow':
		case 'Heavy shower snow': {
			snowOn = true;
			animateSnow();
			$('canvas').attr('style', 'background: #0095d;');
			break;
		}
		case 'light intensity drizzle':
		case 'light rain':
		case 'drizzle':
		case 'heavy intensity drizzle':
		case 'heavy intensity drizzle rain':
		case 'light intensity drizzle rain':
		case 'drizzle rain':
		case 'shower rain and drizzle':
		case 'heavy shower rain and drizzle':
		case 'shower drizzle':
		case 'light rain':
		case 'moderate rain':
		case 'very heavy rain':
		case 'extreme rain':
		case 'freezing rain':
		case 'light intensity shower rain':
		case 'shower rain':
		case 'heavy intensity shower rain':
		case 'ragged shower rain': {
			rainOn = true;
			rainAnimation();
			$('canvas').attr('style', 'background: #00496b;');
			break;
		}
		default: {
			$('canvas').attr('style', 'background: #0095d;');
			$('.card-title').text(currentWeather);
			break;
		}
	}
};

// animations

var canvas = document.querySelector('canvas');
screenHeight = window.innerHeight;
screenWidth = window.innerWidth;
canvas.height = screenHeight;
canvas.width = screenWidth;
ctx = canvas.getContext('2d');

// snow particles
var snowArr = [];
var snowAnimationFrame;
snowOn = false;
function SnowParticle(x, y, dy, radius, opacity) {
	this.x = x;
	this.y = y;
	this.dy = dy;
	this.radius = radius;
	this.opacity;
	this.color = 'rgba(255, 255, 255,' + opacity + ')';

	this.draw = function () {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
		ctx.strokeStyle = this.color;
		ctx.stroke();
		ctx.fillStyle = this.color;
		ctx.fill();
		// update()
	};

	this.update = function () {
		this.y += dy;
		this.draw();

		if (this.y > screenHeight) {
			this.y = 0;
			this.x = Math.random() * screenWidth;
		}
	};
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
animateSnow();

// rain drops

var rainArr = [];
var rainAnimationFrame;
rainOn = false;
function RainDrop(x, y, dy, width, height, opacity) {
	this.x = x;
	this.y = y;
	this.dy = dy;
	this.width = width;
	this.height = height;
	this.opacity;
	this.color = 'rgba(160, 160, 160,' + opacity + ')';

	this.draw = function () {
		ctx.beginPath();
		ctx.rect(this.x, this.y, this.width, this.height);
		ctx.fillStyle = this.color;
		ctx.fill();
		// update()
	};

	this.update = function () {
		this.y += this.dy;

		if (this.y > screenHeight) {
			this.y = 0;
			this.x = Math.random() * screenWidth;
		}
		this.draw();
	};
}

for (var i = 0; i < 500; i++) {
	var x = Math.random() * screenWidth;
	var y = Math.random() * screenHeight;
	var width = height / 10;
	var height = Math.random() * 20;
	var dy = height / 4 + 7;
	var opacity = height * 10;
	rainArr.push(new RainDrop(x, y, dy, width, height, opacity));
}

function rainAnimation() {
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
