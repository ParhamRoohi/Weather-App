async function getData() {
  const res = await fetch(
    "https://api.dastyar.io/express/weather?lat=35.67194277&lng=51.42434403"
  );
  const data = await res.json();

  console.log(data);

  const parentDiv = document.getElementById("Weather_Widget");
  const container = document.getElementById("Weather");
  const date = new Date().toLocaleDateString("fa-IR");

  const icon = {
    snow: "./1Asset 1.png",
    storm: "./1Asset 2.png",
    rain: "./1Asset 3.png",
    partlyCloudy: "./1Asset 5.png",
    rainDrop: "./1Asset 4.png",
    sunny: "./1Asset 6.png",
  };

  data.forEach((day) => {
    const isToday = "امروز" === day.dateTitle;

    if (isToday) {
      const todayDate_Header = document.getElementById("Header_Date-Text");
      todayDate_Header.innerText =
        date +
        new Date().toLocaleDateString("fa-IR", {
          weekday: "long",
        });
      const todayDiv = document.createElement("div");
      todayDiv.classList.add("Weather-Today");
      container.append(todayDiv);

      switch (day.weather.main) {
        case "Clouds":
          todayDiv.innerHTML = `<div><img src="${icon.partlyCloudy}"/></div><div class="Data"><p> حداقل:${day.min}</p> <p>حداکثر:${day.max}</p> </div>`;
          break;
        case "Clear":
          todayDiv.innerHTML = `<div><img src="${icon.sunny}"/></div><div class="Data"><p> حداقل:${day.min}</p> <p>حداکثر:${day.max}</p> </div>`;
          break;
        case "Rain":
          todayDiv.innerHTML = `<div><img src="${icon.rain}"/></div><div class="Data"><p> حداقل:${day.min}</p> <p>حداکثر:${day.max}</p> </div>`;
          break;
        case "Storm":
          todayDiv.innerHTML = `<div><img src="${icon.storm}"/></div><div class="Data"><p> حداقل:${day.min}</p> <p>حداکثر:${day.max}</p> </div>`;
          break;
        case "Snow":
          todayDiv.innerHTML = `<div><img src="${icon.snow}"/></div><div class="Data"><p> حداقل:${day.min}</p> <p>حداکثر:${day.max}</p> </div>`;
          break;
        case "RainDrop":
          todayDiv.innerHTML = `<div><img src="${icon.rainDrop}"/></div><div class="Data"><p> حداقل:${day.min}</p> <p>حداکثر:${day.max}</p> </div>`;
          break;
      }
    } else {
      const createWeatherWidgetDay = document.createElement("div");
      createWeatherWidgetDay.classList.add("Weather_Widget-Day");
      parentDiv.append(createWeatherWidgetDay);
      switch (day.weather.main) {
        case "Clouds":
          createWeatherWidgetDay.innerHTML = `<div class="Data"><p> ${day.dateTitle}</p></div><div class="Day_Icon"><img src="${icon.partlyCloudy}"/></div><div class="Day_Temp"><p> حداقل:${day.min}</p> <p>حداکثر:${day.max}</p> </div>`;
          break;
        case "Clear":
          createWeatherWidgetDay.innerHTML = `<div class="Data"> <p > ${day.dateTitle}</p></div><div class="Day_Icon"><img src="${icon.sunny}"/></div><div class="Day_Temp"><p> حداقل:${day.min}</p> <p>حداکثر:${day.max}</p> </div>`;
          break;
        case "Rain":
          createWeatherWidgetDay.innerHTML = `<div class="Data"><p> ${day.dateTitle}</p></div><div class="Day_Icon"><img src="${icon.rain}"/></div><div class="Day_Temp"><p> حداقل:${day.min}</p> <p>حداکثر:${day.max}</p> </div>`;
          break;
        case "Storm":
          createWeatherWidgetDay.innerHTML = `<div class="Data"><p> ${day.dateTitle}</p></div><div class="Day_Icon"><img src="${icon.storm}"/></div><div class="Day_Temp"><p> حداقل:${day.min}</p> <p>حداکثر:${day.max}</p> </div>`;
          break;
        case "Snow":
          createWeatherWidgetDay.innerHTML = `<div class="Data"><p> ${day.dateTitle}</p></div><div class="Day_Icon"><img src="${icon.snow}"/></div><div class="Day_Temp"><p> حداقل:${day.min}</p> <p>حداکثر:${day.max}</p> </div>`;
          break;
        case "RainDrop":
          createWeatherWidgetDay.innerHTML = `<div class="Data"><p> ${day.dateTitle}</p></div><div class="Day_Icon"><img src="${icon.rainDrop}"/></div><div class="Day_Temp"><p> حداقل:${day.min}</p> <p>حداکثر:${day.max}</p> </div>`;
          break;
      }
    }
  });
}

getData();
