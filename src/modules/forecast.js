import fetchIcon from "..";

export default async function createCard(info){
    let icon = await fetchIcon(info.code);
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = new Date(info.date);
    let card = `
    <div class="forecast-card">
        <h2>${days[day.getUTCDay()]}</h2>
        <div class="card-info">
            <img src="icons/${icon.day}" class="card-icon">
            <p class="card-temp">${info.temp} °C</p>
        </div>
        <p class="card-condition">${info.condition}</p>
        <div class="sun-info">
            <div class="sun-div">
                <img src="icons/thermometer-warmer.svg" class="card-icon-small">
                ${info.maxtemp} °C
            </div>
            <div class="sun-div">
                <img src="icons/thermometer-colder.svg" class="card-icon-small">
                ${info.mintemp} °C
            </div>
        </div>
    </div>
    `
    return card
}