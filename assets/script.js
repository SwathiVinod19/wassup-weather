let newName = document.getElementById("cityInput");
let SaveBtn = document.getElementById("searchBtn");
let history = document.querySelector(".historyList");
let searchHistory = document.getElementById("searchHistory");
var iconsContainer = document.getElementById("iconsContainer");

//The following code is to show the date and day on the weather dashboard
const date = new Date();
// console.log(date);
let dateElem = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

//The following code is to store and retrieve search history using local storage 

let cityHistory = [];
//The following function is called to render city names as li element
function renderCities() {
    history.innerHTML = "";
    console.log(history)
    //new li for each city searched
    for (var i = 0; i < cityHistory.length; i++) {
        var cities = cityHistory[i];
        // console.log(cities)
        var buttonEl = document.createElement("button");
       buttonEl.classList.add("histItems")
        buttonEl.textContent = cities;
        // console.log(li)
        history.appendChild(buttonEl);
    }
}

//The following function is called to get stored cities from local storage
function init() {
    var storedCities = JSON.parse(localStorage.getItem("cityHistory"));
    document.getElementById(list1).textContent = cityHistory;
    //update the array
    if (storedCities !== null) {
        cityHistory = storedCities;

    }
    renderCities();
}

function StoreCities() {

    localStorage.setItem("cities", JSON.stringify(cityHistory));
}
//The screen that loads with the default details
function DefaultScreen() {
    document.getElementById("cityInput").defaultValue = "Toronto";
    GetInfo();
    GetTodayWeather();
}
DefaultScreen()

SaveBtn.addEventListener("click", function (event) {
    event.preventDefault();
    var CitySearch = newName.value.trim();
    if (CitySearch === "") {
        return;
    }
    cityHistory.push(CitySearch);
    StoreCities();
    renderCities();
    GetTodayWeather();
    GetInfo();

})
//Get the current weather details
function GetTodayWeather(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+ newName.value +'&appid=bd544429cdc8186266bfe359b9ffa690')
    .then(response => response.json())
    .then(data => {
        console.log ("Fetching Today's Data")
        console.log (data)

        todayContainer.innerHTML = ""
        //container that has all today-elements
        var todayCard = document.createElement("div")
        todayCard.classList.add("today-icon")
        //created and added class to today card
        var todayEl = document.createElement("p")
        todayEl.classList.add("today-details")
        todayEl.innerHTML = `Date: ${year}-${month}-${dateElem}`
        todayCard.append(todayEl)
        var dayElem = document.createElement("p")
        dayElem.classList.add("today-details")

        const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        let day = weekday[date.getDay()];
        dayElem.innerHTML = day;
        todayCard.append(dayElem)

        var cityNameEl = document.createElement("h2")
        cityNameEl.classList.add("today-details")
        cityNameEl.innerHTML = "--" + newName.value + "--";
        todayCard.append(cityNameEl)
        var imgContainer = document.createElement("div")
        imgContainer.classList.add("currentImage")
        var todayImageEl = document.createElement("img")
        todayImageEl.classList.add("currentImgClass")
        todayImageEl.src = "http://openweathermap.org/img/wn/" +
                    data.weather[0].icon
                    + ".png";
        todayCard.append(imgContainer)
        imgContainer.append(todayImageEl)
        var tempToday = document.createElement("p")
        tempToday.classList.add("currentValues")
        tempToday.innerHTML = "Current temp : "+ Number(data.main.temp - 273.15).toFixed(1) + " ° c";
        var feelsLike = document.createElement("p")
        feelsLike.classList.add("currentValues")
        feelsLike.innerHTML = "Current temp feels like : "+ Number(data.main.feels_like - 273.15).toFixed(1) + " ° c";
        var Todaydes = document.createElement("p")
        Todaydes.classList.add("currentValues")
        Todaydes.innerHTML = "Description: " + String(data.weather[0].description);
        var minEl = document.createElement("p")
        minEl.classList.add("currentValues")
        minEl.innerHTML = "Min temp: " + Number(data.main.temp_min - 273.15).toFixed(1) + " ° c";
        var maxEl = document.createElement("p")
        maxEl.classList.add("currentValues")
        maxEl.innerHTML = "Max temp: " + Number(data.main.temp_max - 273.15).toFixed(1) + " ° c";
        var windEl = document.createElement("p")
        windEl.classList.add("currentValues")
        windEl.innerHTML = "Wind speed: " + Number(data.wind.speed).toFixed(1) + " km/h";
        var humidityEl = document.createElement("p")
        humidityEl.classList.add("currentValues")
        humidityEl.innerHTML = "Humidity : " + Number(data.main.humidity).toFixed(1) + " %";
        todayCard.append(tempToday, feelsLike, Todaydes, minEl, maxEl, windEl, humidityEl)
        
        todayContainer.append(todayCard)

    }) 
}