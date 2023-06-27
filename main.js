/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ fetchIcon)\n/* harmony export */ });\n/* harmony import */ var _modules_forecast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/forecast */ \"./src/modules/forecast.js\");\n\nconst APIKey = \"a68f15d2fde0485d82b215333232506\";\n\n//Header Elements\nconst searchBar = document.querySelector(\"#searchbar\");\nconst searchBtn = document.querySelector(\"#search-btn\");\n\n//Main Card Elements\nconst locationName = document.querySelector(\"#location-name\");\nconst countryName = document.querySelector(\"#country-name\");\nconst currentTemp = document.querySelector(\"#current-temp\");\nconst condition = document.querySelector(\"#condition-text\");\nconst conditionIcon = document.querySelector(\"#current-icon\");\nconst currentTime = document.querySelector(\"#current-time\");\n\n//Side Card Elements\nconst feelsLike = document.querySelector(\"#feels-like\");\nconst sunrise = document.querySelector(\"#sunrise\");\nconst sunset = document.querySelector(\"#sunset\");\nconst humidity = document.querySelector(\"#humidity\");\nconst uvIndex = document.querySelector(\"#uv-index\");\nconst uvIndexIcon = document.querySelector(\"#uv-index-icon\");\nconst windDir = document.querySelector(\"#wind-dir\");\nconst windSpeed = document.querySelector(\"#wind-speed\");\nconst pressure = document.querySelector(\"#pressure\");\nconst precipitation = document.querySelector(\"#precipitation\");\n\n//Forecast Container\nconst forecast = document.querySelector(\"#forecast\");\n(() => {\n  fetchData(APIKey, \"Edmonton\");\n  searchBtn.addEventListener(\"click\", event => {\n    event.preventDefault();\n    searchResults();\n  });\n})();\nasync function fetchData(APIKey, Location) {\n  try {\n    //Attempts to fetch the forecast data\n    let data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${APIKey}&q=${Location}&days=7&aqi=no&alerts=no`, {\n      mode: \"cors\"\n    });\n    let result = await data.json();\n    let icon = await fetchIcon(result.current.condition.code);\n\n    //Checks if its daytime or nightime and sets the icon accordingly.\n    if (result.current.is_day == 1) {\n      conditionIcon.src = `icons/${icon.day}`;\n    } else {\n      conditionIcon.src = `icons/${icon.night}`;\n    }\n    //Sets main card information\n    locationName.textContent = `${result.location.name}, ${result.location.region}`;\n    countryName.textContent = `${result.location.country}`;\n    currentTemp.textContent = `${result.current.temp_c} °C`;\n    condition.textContent = `${result.current.condition.text}`;\n    currentTime.textContent = `LocalTime: ${result.location.localtime}`;\n\n    //Sets side card information\n    //First Column\n    feelsLike.textContent = `Feels Like: ${result.current.feelslike_c} °C`;\n    sunrise.textContent = `Sunrise: ${result.forecast.forecastday[0].astro.sunrise}`;\n    sunset.textContent = `Sunset: ${result.forecast.forecastday[0].astro.sunset}`;\n\n    //Second Column\n    windDir.textContent = `Wind Direction: ${result.current.wind_dir}/${result.current.wind_degree}°`;\n    windSpeed.textContent = `Wind Speed: ${result.current.wind_kph}km/h`;\n    uvIndexIcon.src = `icons/uv-index-${result.current.uv}.svg`;\n    uvIndex.textContent = `UV Index: ${result.current.uv}`;\n\n    //Third Column\n    precipitation.textContent = `Precipitation: ${result.current.precip_mm} mm`;\n    humidity.textContent = `Humidity: ${result.current.humidity}%`;\n    pressure.textContent = `Pressure: ${result.current.pressure_mb} millibars`;\n    forecast.innerHTML = \"\";\n    //Creates Forcast Cards\n    result.forecast.forecastday.forEach(day => {\n      let info = {\n        date: day.date,\n        temp: day.day.avgtemp_c,\n        condition: day.day.condition.text,\n        code: day.day.condition.code,\n        mintemp: day.day.mintemp_c,\n        maxtemp: day.day.maxtemp_c\n      };\n      let card = (0,_modules_forecast__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(info).then(result => forecast.innerHTML += result);\n    });\n  } catch (error) {\n    console.log(error);\n  }\n}\nasync function search(APIKey, Location) {\n  try {\n    let data = await fetch(`https://api.weatherapi.com/v1/search.json?key=${APIKey}&q=${Location}`, {\n      mode: \"cors\"\n    });\n    let JSON = await data.json();\n    return JSON;\n  } catch (error) {\n    console.log(error);\n  }\n}\nasync function searchResults() {\n  if (searchBar.value.trim() !== \"\") {\n    let results = await search(APIKey, searchBar.value.trim());\n    const resultsList = document.querySelector(\"#search-results\");\n    resultsList.innerHTML = \"\";\n    results.forEach(location => {\n      let listItem = document.createElement(\"li\");\n      listItem.textContent = `${location.name}, ${location.region}`;\n      listItem.classList.add(\"search-result\");\n      listItem.addEventListener(\"click\", () => {\n        searchBar.value = \"\";\n        fetchData(APIKey, listItem.textContent);\n        resultsList.style.display = \"none\";\n      });\n      resultsList.style.display = \"block\";\n      resultsList.appendChild(listItem);\n    });\n  }\n}\nasync function fetchIcon(condition) {\n  let info = await fetch(\"conditions.json\");\n  let data = await info.json();\n  return data.find(obj => obj.code == condition);\n}\n\n//# sourceURL=webpack://weather-app/./src/index.js?");

/***/ }),

/***/ "./src/modules/forecast.js":
/*!*********************************!*\
  !*** ./src/modules/forecast.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ createCard)\n/* harmony export */ });\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! .. */ \"./src/index.js\");\n\nasync function createCard(info) {\n  let icon = await (0,___WEBPACK_IMPORTED_MODULE_0__[\"default\"])(info.code);\n  const days = [\"Sunday\", \"Monday\", \"Tuesday\", \"Wednesday\", \"Thursday\", \"Friday\", \"Saturday\"];\n  let day = new Date(info.date);\n  let card = `\n    <div class=\"forecast-card\">\n        <h2>${days[day.getUTCDay()]}</h2>\n        <div class=\"card-info\">\n            <img src=\"icons/${icon.day}\" class=\"card-icon\">\n            <p class=\"card-temp\">${info.temp} °C</p>\n        </div>\n        <p class=\"card-condition\">${info.condition}</p>\n        <div class=\"sun-info\">\n            <div class=\"sun-div\">\n                <img src=\"icons/thermometer-warmer.svg\" class=\"card-icon-small\">\n                ${info.maxtemp} °C\n            </div>\n            <div class=\"sun-div\">\n                <img src=\"icons/thermometer-colder.svg\" class=\"card-icon-small\">\n                ${info.mintemp} °C\n            </div>\n        </div>\n    </div>\n    `;\n  return card;\n}\n\n//# sourceURL=webpack://weather-app/./src/modules/forecast.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;