console.log("I'm here")
var searchHistory = document.querySelector("#searchHistory")

var searchButton = document.getElementById('searchButton')

var currentForecast = document.getElementById("currentTemps")

var futureForecast = document.getElementById("fiveDay")

var curD = document.getElementById("curD")

function saveTols(city) {
    var prevCity = JSON.parse(localStorage.getItem("history")) || []
    prevCity.push(city)
    localStorage.setItem("history", JSON.stringify(prevCity))
}
// save history
function getPriorHistory() {

    var prevCity = JSON.parse(localStorage.getItem("history")) || []
    for (i = 0; i < 4; i++) {
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
        "https://openweathermap.org/img/wn/" +
        data.weather[0].icon
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
    var rain = document.createElement("div")
    rain.textContent = "Sky: " + data.weather[0].main;

    var wind = document.createElement("div")
    wind.textContent = "Wind: " + data.wind.speed + " MPH";





    currentForecast.appendChild(curD)
    currentForecast.appendChild(city)
    currentForecast.appendChild(forecastIcon)
    currentForecast.appendChild(temp)
    currentForecast.appendChild(humid)
    currentForecast.appendChild(rain)
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
            for (var i = 0; i < data.list[i].length; i=i+8){
                console.log(data)

                


            }
            displayWeather5(data)


        },)
}





// let cardsGroupFlex = document.getElementById(fiveDay)

function displayWeather5(data) {


    // var temp = data.list[i].main.temp;
    // console.log(temp)

    // var humid = data.list[i].main.humidity;
    // console.log(humid)
    // var wind = data.list[i].wind.speed
    // console.log(wind)



    var temp = document.createElement("div")
    temp.textContent = data.list[i].main.temp;
    

    var humid = document.createElement("div")
    humid.textContent = data.list[i].main.humidity;

    var rain = document.createElement("div")
    rain.textContent = data.list[i].weather[0].temp;

    var wind = document.createElement("div")
    wind.textContent = data.list[i].wind.speed;

    console.log(temp)
    console.log(humid)
    console.log(rain)
    console.log(wind)

    futureForecast.appendChild(temp)
    futureForecast.appendChild(humid)
    futureForecast.appendChild(rain)
    futureForecast.appendChild(wind)




}


//     futureForecast.appendChild(temp)


// var futDate = (data.list[i].dt * 1000);
// console.log(futDate)

// console.log(data)

// var date = $("<h2>").text(moment.unix(data.list[i].dt).format("L"))
// console.log(date)

//     // add date

//     var temp = document.createElement("div")
//     temp.textContent = "Temperature: " + data.main.temp + "F";

//     var humid = document.createElement("div")
//     humid.textContent = "Humidity" + data.main.humidity + "%";



//     var rain = document.createElement("div")
//     rain.textContent = data.weather[0].main

//     console.log(temp)

//     futureForecast.appendChild(city)
//     futureForecast.appendChild(temp)
//     futureForecast.appendChild(humid)
//     futureForecast.appendChild(rain)
 //     cardsGroupFlex.innerHTML +=
    //         <div class="card">
    //             <p></p>
    //         </div>
    // }
    // let detailArray = {
    //     temp: "Temperature" 




// }




searchButton.addEventListener('click', getApi);

getPriorHistory()
