console.log("I'm here")
var searchHistory = document.querySelector("#searchHistory")

var searchButton = document.getElementById('searchButton')

var currentForecast = document.getElementById("currentTemps")

var futureForecast = document.getElementById("dayByday")

var curD = document.getElementById("curD")

var futD = document.getElementById("futD")

var clearButton = document.getElementById("clearHistory");



function saveTols(city) {
    console.log(city)
    var prevCity = JSON.parse(localStorage.getItem("history")) || []
    prevCity.push(city)
    localStorage.setItem("history", JSON.stringify(prevCity))
}
// save history
function getPriorHistory() {

    var prevCity = JSON.parse(localStorage.getItem("history")) || []
   for (i = 0; i < 10; i++) {
        createPriorCity(prevCity[i])
    }  
    // if i > 5 {
    //         localStorage.removeItem(prevCity[i])
    //   }
  
    
      
  
    // renderSearchHistory();
    // if (searchHistory.length > 0) {
    //   getWeather(searchHistory[searchHistory.length - 1]);
    // }
}

function createPriorCity(city) {
    var cityEl = document.createElement("li")
    cityEl.textContent = city.name
    // eElement.insertBefore(newFirstElement, eElement.firstChild);
    searchHistory.insertBefore(cityEl, searchHistory.firstChild);
}



// function clearCity() {
//     localStorage.removeItem("history");
//     return '';
//   };


function getApi() {
    var city = document.getElementById('citySearch').value;

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
// localStorage.setItem("history", city)
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

  


  for (var i = 0; i < data.list.length; i = i + 8) {

    var forecastIcon = document.createElement("img");
    forecastIcon.setAttribute(
        "src",
        "https://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png" 

    
    );
    forecastIcon.setAttribute(
        "alt",
        data.list[i].weather[0].description
    );

   
    var nextD = moment().add(1, "days")
    futD.textContent = (nextD.format("MMM Do, YYYY"));
    // var currentD = moment();
    // curD.textContent = (currentD.format("MMM Do, YYYY"));

    // var todayDate = moment().format("MMM Do, YYYY"); 
    // var nextDay = moment(currentDay2).add(1, "days").format("MMM Do, YYYY");

  

  

    var temp = document.createElement("div");
    temp.textContent = "Temp: " + data.list[i].main.temp +" F";
    temp.setAttribute("style", "font-size: 15px; ");

    var humid = document.createElement("div");
   
    humid.textContent = "Humidity: "+ data.list[i].main.humidity + " %";
    humid.setAttribute("style", "font-size: 15px; ");

  

    var wind = document.createElement("div");
    
    wind.textContent = "Wind: "+ data.list[i].wind.speed + " MPH";

    console.log(temp);
    console.log(humid);
    console.log(wind);

    var daySection = document.createElement("div");
    daySection.className = "row justify-content-end forecast-day";

    daySection.appendChild(futD);
    
    daySection.appendChild(forecastIcon);
    daySection.appendChild(temp);
    daySection.appendChild(humid);
  
    daySection.appendChild(wind);

    // Adding daySection to Main section
    futureForecast.appendChild(daySection);
  }
    


}


// function clearWeather() {
//     currentForecast =[]
//     futureForecast =[]
// }

searchButton.addEventListener('click', getApi);

getPriorHistory()


// clearButton.addEventListener("click", clearCity);


