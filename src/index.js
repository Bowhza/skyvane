import createCard from "./modules/forecast";

const APIKey = "a68f15d2fde0485d82b215333232506";
const searchBar = document.querySelector("#searchbar");
const searchBtn = document.querySelector("#search-btn");

(()=>{
    fetchData(APIKey, "Edmonton");

    searchBtn.addEventListener("click", (event)=>{
        event.preventDefault();
        searchResults();
    })
})();

async function fetchData(APIKey, Location)
{
    try{
        //Main Card Elements
        const locationName = document.querySelector("#location-name");
        const countryName = document.querySelector("#country-name");
        const currentTemp = document.querySelector("#current-temp");
        const condition = document.querySelector("#condition-text");
        const conditionIcon = document.querySelector("#current-icon");
        const currentTime = document.querySelector("#current-time");

        //Side Card Elements
        const feelsLike = document.querySelector("#feels-like");
        const sunrise = document.querySelector("#sunrise");
        const sunset = document.querySelector("#sunset");
        const humidity = document.querySelector("#humidity");
        const uvIndex = document.querySelector("#uv-index");
        const uvIndexIcon = document.querySelector("#uv-index-icon");
        const windDir = document.querySelector("#wind-dir");
        const windSpeed = document.querySelector("#wind-speed");
        const pressure = document.querySelector("#pressure");
        const precipitation = document.querySelector("#precipitation");

        //Forecast
        const forecast = document.querySelector("#forecast");

        let data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${APIKey}&q=${Location}&days=7&aqi=no&alerts=no`, {
            mode: "cors"
        });
        let result = await data.json();
        let icon = await fetchIcon(result.current.condition.code);
        
        console.log(result);

        //Checks if its daytime or nightime and sets the icon accordingly.
        if(result.current.is_day == 1){
            conditionIcon.src = `icons/${icon.day}`;
        } else {conditionIcon.src = `icons/${icon.night}`}
        //Sets main card information
        locationName.textContent = `${result.location.name}, ${result.location.region}`;
        countryName.textContent = `${result.location.country}`;

        currentTemp.textContent = `${result.current.temp_c} °C`
        condition.textContent = `${result.current.condition.text}`

        currentTime.textContent = `LocalTime: ${result.location.localtime}`;

        //Sets side card information
        //First Column
        feelsLike.textContent = `Feels Like: ${result.current.feelslike_c} °C`;
        sunrise.textContent = `Sunrise: ${result.forecast.forecastday[0].astro.sunrise}`
        sunset.textContent = `Sunset: ${result.forecast.forecastday[0].astro.sunset}`

        //Second Column
        windDir.textContent = `Wind Direction: ${result.current.wind_dir}/${result.current.wind_degree}°`;
        windSpeed.textContent = `Wind Speed: ${result.current.wind_kph}km/h`;
        uvIndexIcon.src = `icons/uv-index-${result.current.uv}.svg`
        uvIndex.textContent = `UV Index: ${result.current.uv}`;

        //Third Column
        precipitation.textContent = `Precipitation: ${result.current.precip_mm} mm`
        humidity.textContent = `Humidity: ${result.current.humidity}%`;
        pressure.textContent = `Pressure: ${result.current.pressure_mb} millibars`

        forecast.innerHTML = "";
        //Creates Forcast Cards
        result.forecast.forecastday.forEach(day =>{
            let info = {
                date: day.date,
                temp: day.day.avgtemp_c,
                condition: day.day.condition.text,
                code: day.day.condition.code,
                mintemp: day.day.mintemp_c,
                maxtemp: day.day.maxtemp_c
            }
            let card = createCard(info)
                .then(result => forecast.innerHTML += result);
        })

    } catch(error){
        console.log(error);
    }
}

async function search(APIKey, Location){
    try{
        let data = await fetch(`https://api.weatherapi.com/v1/search.json?key=${APIKey}&q=${Location}`, {
            mode: "cors"
        });
        let JSON = await data.json();
        return JSON;
    } catch(error){
        console.log(error);
    }
}

async function searchResults(){
    if(searchBar.value.trim() !== ""){
        let results = await search(APIKey, searchBar.value.trim());
        const resultsList = document.querySelector("#search-results");
        resultsList.innerHTML = "";
        results.forEach(location => {
            let listItem = document.createElement("li");
            listItem.textContent = `${location.name}, ${location.region}`
            listItem.classList.add("search-result");
            
            listItem.addEventListener("click", ()=>{
                searchBar.value = "";
                fetchData(APIKey, listItem.textContent);
                resultsList.style.display = "none";
            });

            resultsList.style.display = "block";
            resultsList.appendChild(listItem);
        });
    }
}

export default async function fetchIcon(condition){
    let info = await fetch("conditions.json");
    let data = await info.json();
    return data.find(obj => obj.code == condition);
}