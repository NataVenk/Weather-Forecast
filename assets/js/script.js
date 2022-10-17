console.log("I'm here")

// var h2;
var searchButton = document.getElementById('searchButton');


// const APIKey = "79fcf7dc6a392bfb9db10a054d9e49c5";

// var city = document.getElementById('citySearch').value;
// console.log("city")
// var state;
// var country;


function getApi(){
   var city = document.getElementById('citySearch');
   var requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=79fcf7dc6a392bfb9db10a054d9e49c5`


    fetch(requestUrl)
        .then(function (response) {
        return response.json();
        })
        .then(function (data) {
        
        console.log(data);
    }); 
   
}

// function fetchWeather(location){
//     console.log(location)
//     var  {lat}=location;
//     var {log} =location;


// function getApi5(){
//     var requestUrl5 = "http://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=79fcf7dc6a392bfb9db10a054d9e49c5"
//         fetch(requestUrl)
//             .then(function (response) {
//             return response.json();
//             })
//             .then(function (data) {
//                 for (var i=0; i<data.legth; i++){
//                 console.log(data)
//             }

//         });    

// }

searchButton.addEventListener('click', getApi);


