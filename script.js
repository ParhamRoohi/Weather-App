const parentDiv = document.getElementById("Weather_Widget");
const container = document.getElementById("Weather");
const todayDiv = document.createElement("div");
const date = new Date().toLocaleDateString("fa-IR");
let createWeatherWidgetDay;

const icon = {
  snow: "./images/snow.png",
  storm: "./images/storm.png",
  rain: "./images/rainDrop.png",
  partlyCloudy: "./images/partlyCloudy.png",
  rainDrop: "./images/rainDrop.png",
  sunny: "./images/sunny.png",
};

const weatherDescriptions = {
  clearSky: "آسمان صاف",
  fewClouds: "چند ابر",
  brokenClouds: "ابرهای شکسته",
  rain: "بارش باران",
  thunderStorm: "طوفانی",
  snow: "برف",
};

async function getData() {
  const res = await fetch(
    "https://api.dastyar.io/express/weather?lat=35.67194277&lng=51.42434403"
  );
  const data = await res.json();

  console.log(data);

  data.forEach((day) => {
    const isToday = "امروز" === day.dateTitle;
    createWeatherWidgetDay = document.createElement("div");
    if (isToday) {
      const todayDate_Header = document.getElementById("Header_Date-Text");
      todayDate_Header.innerText =
        date +
        new Date().toLocaleDateString("fa-IR", {
          weekday: "long",
        });
      todayDiv.classList.add("Weather-Today");
      container.append(todayDiv);

      switch (day.weather.main) {
        case "Clouds":
          getTodayWeatherDes(
            icon.partlyCloudy,
            day.min,
            day.max,
            translateWeatherDescription(weatherDescriptions.fewClouds)
          );
          break;
        case "Clear":
          getTodayWeatherDes(
            icon.sunny,

            day.min,
            day.max,
            translateWeatherDescription(weatherDescriptions.clearSky)
          );
          break;
        case "Rain":
          getTodayWeatherDes(
            icon.rain,
            day.min,
            day.max,
            translateWeatherDescription(weatherDescriptions.rain)
          );
          break;
        case "Storm":
          getTodayWeatherDes(
            icon.storm,
            day.min,
            day.max,
            translateWeatherDescription(weatherDescriptions.thunderStorm)
          );
          break;
        case "Snow":
          getTodayWeatherDes(
            icon.snow,
            day.min,
            day.max,
            translateWeatherDescription(weatherDescriptions.snow)
          );
          break;
        case "RainDrop":
          getTodayWeatherDes(
            icon.rainDrop,
            day.min,
            day.max,
            translateWeatherDescription(weatherDescriptions.brokenClouds)
          );
          break;
      }
    } else {
      createWeatherWidgetDay.classList.add("Weather_Widget-Day");
      parentDiv.append(createWeatherWidgetDay);
      switch (day.weather.main) {
        case "Clouds":
          getWeatherForecastDes(day.date, icon.partlyCloudy, day.min, day.max);
          break;
        case "Clear":
          getWeatherForecastDes(day.date, icon.sunny, day.min, day.max);
          break;
        case "Rain":
          getWeatherForecastDes(day.date, icon.rain, day.min, day.max);
          break;
        case "Storm":
          getWeatherForecastDes(day.date, icon.storm, day.min, day.max);
          break;
        case "Snow":
          getWeatherForecastDes(day.date, icon.snow, day.min, day.max);
          break;
        case "RainDrop":
          getWeatherForecastDes(day.date, icon.rainDrop, day.min, day.max);
          break;
      }
    }
  });
}

function getTodayWeatherDes(icon, min, max, text) {
  todayDiv.innerHTML = `<div><img src="${icon}"/></div> <div class ="text">${text}</div><div class="Data"><p> حداقل:${Math.round(
    min
  ).toLocaleString("fa-IR")}</p> <p>حداکثر:${Math.round(max).toLocaleString(
    "fa-IR"
  )}</p> </div>`;
}

function getWeatherForecastDes(date, icon, min, max) {
  let myDate = new Date(date);
  createWeatherWidgetDay.innerHTML = `<div class="Data"><p> ${myDate.toLocaleDateString(
    "fa-IR",
    {
      weekday: "long",
    }
  )}</p></div><div class="Day_Icon"><img src="${icon}"/></div><div class="Day_Temp"><p> حداقل:${Math.round(
    min
  ).toLocaleString("fa-IR")}</p> <p>حداکثر:${Math.round(max).toLocaleString(
    "fa-IR"
  )}</p> </div>`;
}

function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours();
  return hours;
}

function setAppTheme() {
  const element = document.body;
  const currentTime = getCurrentTime();

  if (currentTime >= 20 || currentTime < 6) {
    element.classList.add("Dark_Mode");
  } else {
    element.classList.remove("Dark_Mode");
  }
}

function translateWeatherDescription(description) {
  const lowercaseDescription = description.toLowerCase();
  if (lowercaseDescription in weatherDescriptions) {
    return weatherDescriptions[lowercaseDescription];
  } else {
    return description;
  }
}

setAppTheme();
setInterval(setAppTheme, 5 * 60 * 1000);
getData();
