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