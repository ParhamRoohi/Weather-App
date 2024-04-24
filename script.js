const parentDiv = document.getElementById("Weather_Widget");
const container = document.getElementById("Weather");
const todayDiv = document.createElement("div");
const date = new Date().toLocaleDateString("fa-IR");
let createWeatherWidgetDay;

const icon = {
  snow: "./1Asset 1.png",
  storm: "./1Asset 2.png",
  rain: "./1Asset 3.png",
  partlyCloudy: "./1Asset 5.png",
  rainDrop: "./1Asset 4.png",
  sunny: "./1Asset 6.png",
};

function getTodayWeatherDes(icon, min, max) {
  todayDiv.innerHTML = `<div><img src="${icon}"/></div><div class="Data"><p> حداقل:${Math.round(
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
          getTodayWeatherDes(icon.partlyCloudy, day.min, day.max);
          break;
        case "Clear":
          getTodayWeatherDes(icon.sunny, day.min, day.max);
          break;
        case "Rain":
          getTodayWeatherDes(icon.rain, day.min, day.max);
          break;
        case "Storm":
          getTodayWeatherDes(icon.storm, day.min, day.max);
          break;
        case "Snow":
          getTodayWeatherDes(icon.snow, day.min, day.max);
          break;
        case "RainDrop":
          getTodayWeatherDes(icon.rainDrop, day.min, day.max);
          break;
      }
    } else {
      createWeatherWidgetDay.classList.add("Weather_Widget-Day");
      parentDiv.append(createWeatherWidgetDay);
      switch (day.weather.main) {
        case "Clouds":
          getWeatherforecastDes(day.date, icon.partlyCloudy, day.min, day.max);
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
getData();
