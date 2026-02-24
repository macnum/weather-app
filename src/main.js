import './styles/main.css';
import DOM from './dom.js';

import { toggleUnit } from './utils.js';

const toggleBtn = document.querySelector('.toggle-unit');

const searchForm = document.querySelector('#myWeatherForm');

const weatherBaseURL =
	'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
const weatherApiKey = 'UBGBWDQ2ZLTQ82XEXWCNB7QC9';

const mainContainer = document.querySelector('.main-container');
const loader = document.querySelector('.loader');

async function weatherApp(location, endDate) {
	console.log('requestData');

	const myRequest = checkUrlParameters(location, endDate);

	if (!myRequest) return;

	const data = await getData(myRequest);
	hideLoader();
	DOM.renderData(data);
}

function showLoader() {
	loader.classList.remove('hidden');

	mainContainer.classList.add('hidden');
}
function hideLoader() {
	loader.classList.add('hidden');
	mainContainer.classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
	weatherApp('lagos');
});
searchForm.addEventListener('submit', (e) => {
	const search = document.querySelector('#search');
	console.log('FORM SUBMITTED');
	e.preventDefault();
	const locationSearchQuery = search.value.toLowerCase().trim();
	if (locationSearchQuery) {
		weatherApp(locationSearchQuery);
	}
});

function checkUrlParameters(location, endDate) {
	const todayDate = new Date().toISOString().split('T')[0];
	let url = '';
	if (location && endDate) {
		return `${weatherBaseURL}${location}/${todayDate}/${endDate}?key=${weatherApiKey}`;
	} else if (location) {
		return `${weatherBaseURL}${location}?key=${weatherApiKey}`;
	}
	return '';
}

async function getData(url) {
	try {
		showLoader();
		const response = await fetch(url, {
			method: 'GET',
		});
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}
		const result = await response.json();
		console.log(result);
		return result;
	} catch (error) {
		console.error(error.message);
	}
	// finally {
	// 	hideLoader();
	// }
}

toggleBtn.addEventListener('click', (e) => {
	toggleUnit();
	DOM.updateData();
});
