const api = {
  key: "f6273c080b02e6439d700a66353fe6ed",
  base: "https://api.openweathermap.org/data/2.5/" //key intentionally in the code for demonstration purposes
};

const search = document.querySelector(".search");
const btn = document.querySelector(".btn");
const section = document.querySelector("section");
const error = document.querySelector(".error");
const container = document.querySelector(".bottom");

//grabs data from api
const getData = async function () {
  const request = await fetch(
    `${api.base}weather?q=${search.value}&appid=${api.key}&units=imperial`
  );

  const data = await request.json();

  console.log(data);
  displayData(data); 
};

/*Makes are button interactive. Type in the field and click submit grabs data from API based on city name. */
btn.addEventListener("click", function (e) {
  e.preventDefault();//prevenst page from reloading
  if (e.type === "click") {
    getData(search.value);
    console.log(search.value);
    //getData();
	container.classList.remove("container-fade-in");
	 
  }
});

//Displays data on webpage.
const displayData = function (data) {
  if (data.cod === "404") {
    //const error = document.querySelector(".error");
    error.textContent = "Please enter a valid city!";
	
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

	search.value = "";//Clears search value .
	error.textContent =""; // Clears error code.
	  
	container.classList.add("container-fade-in");
	section.classList.remove("hide");
  }
};

//Creates the current date to display.
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
