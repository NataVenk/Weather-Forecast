console.log("I'm here")
var searchHistory = document.querySelector("#searchHistory")

var searchButton = document.getElementById('searchButton')

var currentForecast = document.getElementById("currentTemps")

var futureForecast = document.getElementById("dayByday")

var curD = document.getElementById("curD")

// var cityEl = document.createElement("button")


var clearButton = document.getElementById("clearHistory");


// save to the list in local storage
function saveTols(city) {
    console.log(city)
    var prevCity = JSON.parse(localStorage.getItem("history")) || []
    prevCity.push(city)
    localStorage.setItem("history", JSON.stringify(prevCity))
}
// save history
function getPriorHistory() {

    var prevCity = JSON.parse(localStorage.getItem("history")) || []
   for (i = 0; i < prevCity.length; i++) {
        createPriorCity(prevCity[i])
    } 
    
}
  

function createPriorCity(city) {
    console.log (city)
    var cityEl = document.createElement("button")
    cityEl.className += 'btn btn-outline-secondary';
    cityEl.textContent = city.name
    cityEl.dataset.lat = city.lat
    cityEl.dataset.lon = city.lon
    searchHistory.insertBefore(cityEl, searchHistory.firstChild);
   cityEl.addEventListener('click', getNewData);
    // cityEl.addEventListener('click', getApi(city.name));

}

function getNewData(e){
    console.log (e.target)
    const city={
        name:e.target.textContent, 
        lat:e.target.dataset.lat,
        lon:e.target.dataset.lon,
    }
    getWeather1(city);
    getWeather5(city);
}


function clearHistory(){
    localStorage.clear();
    searchHistory.innerHTML=""
    
}






function getApi() {

     var  city = document.getElementById('citySearch').value;
//     // }
// console.log (nCity)
    var requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city},US&limit=10&appid=79fcf7dc6a392bfb9db10a054d9e49c5`


    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            const newCity = {
                name: data[0].name, lat: data[0].lat, lon: data[0].lon
            }
            createPriorCity(newCity)
            saveTols(newCity)
            getWeather1(newCity);
            getWeather5(newCity);


        });


}

// getting current forecast


function getWeather1(location) {
    var lat = location.lat;
    var lon = location.lon;
    var requestUrl1 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=79fcf7dc6a392bfb9db10a054d9e49c5`
    console.log(requestUrl1)

    fetch(requestUrl1)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            displayWeather(data)

        },)

}



function displayWeather(data) {
    currentForecast.innerHTML = ""

    var forecastIcon = document.createElement("img");
    forecastIcon.setAttribute(
        "src",
        "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png" 

    );
    forecastIcon.setAttribute(
        "alt",
        data.weather[0].description
    );



    var city = document.createElement("div")
    city.textContent = data.name
    city.setAttribute("style", "font-size: 25px; font-weight: bold; text-decoration:underline; ");

    var currentD = moment();
    curD.textContent = (currentD.format("MMM Do, YYYY"));



    var temp = document.createElement("div")
    temp.textContent = "Temperature: " + data.main.temp + " F";


    var humid = document.createElement("div")
    humid.textContent = "Humidity: " + data.main.humidity + " %";
    // humid.setAttribute("style", "font-size: 15px; ");


    var wind = document.createElement("div")
    wind.textContent = "Wind: " + data.wind.speed + " MPH";





    currentForecast.appendChild(curD)
    currentForecast.appendChild(city)
    currentForecast.appendChild(forecastIcon)
    currentForecast.appendChild(temp)
    currentForecast.appendChild(humid)
   
    currentForecast.appendChild(wind)



}

// getting 5 day forecast


function getWeather5(location) {
    var lat = location.lat;
    var lon = location.lon;
    var requestUrl5 = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=79fcf7dc6a392bfb9db10a054d9e49c5`

    console.log(requestUrl5)

    fetch(requestUrl5)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            for (var i = 0; i < data.list.length; i = i + 8) {
                console.log(data)

        
            }
            displayWeather5(data)


        },)
}








function displayWeather5(data) {

    futureForecast.innerHTML = ""


  for (var i = 0; i < data.list.length; i = i + 8) {

    var date = document.createElement("div");
    date.textContent = moment.unix( data.list[i].dt).format("LL");

    var forecastIcon = document.createElement("img");
    forecastIcon.setAttribute(
        "src",
        "https://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png" 

    
    );
    forecastIcon.setAttribute(
        "alt",
        data.list[i].weather[0].description
    );

  

    var temp = document.createElement("div");
    temp.textContent = "Temperature: " + data.list[i].main.temp +" F";
    temp.setAttribute("style", "font-size: 15px; ");

    var humid = document.createElement("div");
   
    humid.textContent = "Humidity:     "+ data.list[i].main.humidity + " %";
    humid.setAttribute("style", "font-size: 15px; ");

    var wind = document.createElement("div");
    wind.textContent = "Wind:      "+ data.list[i].wind.speed + " MPH";

    
    var daySection = document.createElement("div");
    daySection.className = "row justify-content-end forecast-day";

    daySection.appendChild(date);
  
    
    daySection.appendChild(forecastIcon);
    daySection.appendChild(temp);
    daySection.appendChild(humid);
  
    daySection.appendChild(wind);

    futureForecast.appendChild(daySection);
  }
    


}


function searchPrevCity(){
    console.log("searchNcity")
}

searchButton.addEventListener('click', getApi);
getPriorHistory()

searchHistory.addEventListener('click', searchPrevCity)



clearButton.addEventListener('click', clearHistory);





