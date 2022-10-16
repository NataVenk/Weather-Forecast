console.log("I'm here")

// var h2;
// var searchButton = document.getElementById('searchButton');


const APIKey = "79fcf7dc6a392bfb9db10a054d9e49c5";

var city = document.getElementById('citySearch');
var state;
var country;

// function getApi(){

    var requestUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + APIKey;
    // console.log(requestUrl)
// }
    fetch(requestUrl)
        .then(function (response) {
        return response.json();
        })
        .then(function (data) {
            for (var i=0; i<data.legth; i++){
            console.log(data)
        }
    });


