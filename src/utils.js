import partly_cloudy from './icons/partly-cloudy.gif';
import cloudy from './icons/cloudy.gif';
import rain from './icons/rain.gif';
import snow from './icons/snow.gif';
import sun from './icons/sun.gif';
import storm from './icons/storm.gif';
import default_gif from './icons/default.gif';

function toCelsius(f) {
	return (f - 32) * (5 / 9);
}

function toFahrenheit(c) {
	return (c * 9) / 5 + 32;
}

let currentUnit = 'F';

function getCurrentUnit() {
	return currentUnit;
}

function toggleUnit() {
	currentUnit = currentUnit === 'F' ? 'C' : 'F';
	return currentUnit;
}

function convertTemp(temp) {
	return currentUnit === 'C' ? toCelsius(temp) : temp;
}
function getWeatherIcon(iconName) {
	const name = iconName.toLowerCase();

	switch (true) {
		case name.includes('partly'):
			return partly_cloudy;

		case name.includes('cloud'):
			return cloudy;

		case name.includes('rain'):
			return rain;

		case name.includes('snow'):
			return snow;

		case name.includes('clear'):
			return sun;

		case name.includes('thunder'):
			return storm;

		default:
			return default_gif;
	}
}

export { getWeatherIcon, toCelsius, toggleUnit, convertTemp, getCurrentUnit };
