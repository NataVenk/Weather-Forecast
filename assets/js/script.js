console.log("I'm here")
var searchHistory = document.querySelector("#searchHistory")

var searchButton = document.getElementById('searchButton')

var currentForecast = document.getElementById("currentTemps")

var futureForecast = document.getElementById("fiveForecast")

function saveTols(city) {
    var prevCity = JSON.parse(localStorage.getItem("history")) || []
    prevCity.push(city)
    localStorage.setItem("history", JSON.stringify(prevCity))
}
// save history
function getPriorHistory() {

    var prevCity = JSON.parse(localStorage.getItem("history")) || []
    for (i=0; i<5; i++){
        createPriorCity(prevCity[i])
    }



}

function createPriorCity(city) {
    const cityEl = document.createElement("li")
    cityEl.textContent = city.name
    searchHistory.appendChild(cityEl)
}
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
            // getWeather5(location);



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

        }

        )

}

function displayWeather(data) {

    var city = document.createElement("div")
    city.textContent=data.name
   

    // var date = document.createElement("div")
    // date.textContent = 

    var temp = document.createElement("div")
    temp.textContent = "Temperature: " + data.main.temp;

    var humid = document.createElement ("div")
    humid.textContent = "Humidity: " + data.main.humidity;
    
    var rain = document.createElement("div")
    rain.textContent = "Rain: " + data.weather[0].main
   


    currentForecast.appendChild(city)
    currentForecast.appendChild(temp)
    currentForecast.appendChild(humid)
    currentForecast.appendChild(rain)
    


}


// getting 5 day forecast


function getWeather5(location){
    var lat=location.lat;
    var lon =location.lon;
    var requestUrl5 = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=79fcf7dc6a392bfb9db10a054d9e49c5`
    console.log(location)

    fetch(requestUrl5)
        .then(function (response) {
        return response.json();
        })
        .then(function (data) {
                console.log(data);
               

        },)

    }

     

function displayWeather5(data) {

    var city = document.createElement("div")
    city.textContent=data.name
    

  

    var temp = document.createElement("div")
    temp.textContent = "Temperature: " + data.main.temp;

    var humid = document.createElement ("div")
    humid.textContent = "Humidity" + data.main.humidity;
    
    var rain = document.createElement("div")
    rain.textContent = data.weather[0].main
   
console.log(temp)

    futureForecast.appendChild(city)
    futureForecast.appendChild(temp)
    futureForecast.appendChild(humid)
    futureForecast.appendChild(rain)
    


}




searchButton.addEventListener('click', getApi);

getPriorHistory()
