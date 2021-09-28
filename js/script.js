const api = {
  key: "f6273c080b02e6439d700a66353fe6ed",
  base: "https://api.openweathermap.org/data/2.5/"
};

const search = document.querySelector(".search");
const btn = document.querySelector(".btn");
const section = document.querySelector("section");
const container = document.querySelector(".bottom");

const getData = async function () {
  const request = await fetch(
    `${api.base}weather?q=${search.value}&appid=${api.key}&units=imperial`
  );

  const data = await request.json();

  console.log(data);
  displayData(data);
};

btn.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.type === "click") {
    getData(search.value);
    console.log(search.value);
    //getData();
	container.classList.remove("container-fade-in");
  }
});

const displayData = function (data) {
  if (data.cod === "404") {
    const error = document.querySelector(".error");
    error.textContent = "Please enter a valid city!";
    search.value = "";
  } else {
    const city = document.querySelector(".city");
    city.innerText = `${data.name}, ${data.sys.country}`;

    const today = new Date();
    const date = document.querySelector(".date");
    date.innerText = dateFunction(today);

    const temp = document.querySelector(".temp");
    temp.innerHTML = `Temp : ${Math.round(data.main.temp)} <span>&deg;F</span>`;

    const weather = document.querySelector(".weather");
    weather.innerText = `Weather : ${data.weather[0].main}`;

    const tempRange = document.querySelector(".temp-range");
    tempRange.innerText = `Temp Range : ${Math.round(
      data.main.temp_min
    )}°F  - ${Math.round(data.main.temp_max)}°F`;

    const weatherIcon = document.querySelector(".weather-icon");
    const iconURL = "http://openweathermap.org/img/wn/";
    weatherIcon.src = iconURL + data.weather[0].icon + "@2x.png";

    search.value = "";
	
	container.classList.add("container-fade-in");
	section.classList.remove("hide");
  }
};

const dateFunction = function (d) {
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec"
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date}, ${month}, ${year}`;
};
