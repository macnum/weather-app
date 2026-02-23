import { isToday, format } from 'date-fns';

import { convertTemp, getCurrentUnit, getWeatherIcon } from './utils.js';

const DOM = (() => {
	let weatherData = null;
	const search = document.querySelector('#search');
	const unit = document.querySelector('.temp-unit');
	function renderData(data) {
		weatherData = data;
		const currentSection = document.querySelector('#current');
		const detailsSection = document.querySelector('#details');
		const forecastSection = document.querySelector('#forecast');
		currentSection.innerHTML = '';
		detailsSection.innerHTML = '';
		forecastSection.innerHTML = '';

		search.placeholder = `  ${data.address}`;
		search.value = '';

		const currentCard = document.createElement('div');
		currentCard.className = 'current-card';
		currentCard.innerHTML = `
		<div><strong>${convertTemp(data.currentConditions.temp).toFixed(1)}&deg;${getCurrentUnit()}</strong></div>
		
		<div>${data.days[0].description}</div>
		</div>
	`;

		currentSection.appendChild(currentCard);

		const detailsCard = document.createElement('div');
		detailsCard.className = 'details-card';
		detailsCard.innerHTML = `<div class="rect-card detail"><i class="fi fi-tr-temperature-list"></i> Feels like: <span class="number-card"> ${convertTemp(data.currentConditions.feelslike).toFixed(1)}&deg;</span></div>

		<div class="rect-card detail"> <i class="fas fa-droplet"></i> Humidity: <span class="number-card">${data.currentConditions.humidity}%</span></div>

		<div class="rect-card detail"> <i class="fas fa-wind"></i> Wind: <span class="number-card">${data.currentConditions.windspeed} mp/h</span></div>

		<div class="rect-card detail"><i class="fa-regular fa-eye"></i> visibility: <span class="number-card">${data.currentConditions.visibility}mi</span></div>`;

		detailsSection.appendChild(detailsCard);

		const forecastDayCard = document.createElement('div');
		forecastDayCard.className = 'forecast-card';

		data.days.slice(0, 7).forEach((day, idx) => {
			const dayCard = document.createElement('div');
			dayCard.className = `day-card item${idx + 1}`;
			const dateObj = new Date(day.datetime + 'T00:00:00');
			const iconSrc = getWeatherIcon(day.icon);
			const dayName = isToday(dateObj) ? 'Today' : format(dateObj, 'iii');
			dayCard.innerHTML = `
			<img src="${iconSrc}" alt="${day.conditions}" class="weather-icon"/>
			<p>${day.conditions}</p>
			<p>${dayName}</p>
			<p>${convertTemp(day.temp).toFixed(1)}&deg;${getCurrentUnit()}</p>`;
			forecastDayCard.appendChild(dayCard);
		});
		forecastSection.appendChild(forecastDayCard);
	}
	function updateData() {
		if (weatherData) {
			renderData(weatherData);
			unit.textContent = getCurrentUnit();
			return;
		}
	}

	return {
		renderData,
		updateData,
	};
})();

export default DOM;
