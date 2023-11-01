// Starting your js here
console.log('Weather app using fetch Api');

// Grab the input element
let cityName = document.getElementById('cityName');
// console.log(cityNameInp.value)

// Grab the weather now button
let weatherBtn = document.getElementById('submitBtn');

// Add Event Listener to WeatherBtn
weatherBtn.addEventListener('click', weatherCity);

// Creating a function which is placed in the EventListener
function weatherCity(e) {
    if (cityName.value == "") {
        alert('Please Enter City Name to get weather')
    }
    else {
        // console.log(cityName.value)
        let apikey = '6b3bf6db669b4be582982724212510';
        let cityValue = cityName.value;
        // url = `http://api.weatherapi.com/v1/current.json?key=${apikey}=${cityName.value}&aqi=yes`
        url = `http://api.weatherapi.com/v1/current.json?key=6b3bf6db669b4be582982724212510&q=${cityValue}&aqi=yes`

        fetch(url, {
            method: "GET",
            headers: { 'content-type': 'application/json' }
        }).then((res) => {
            return res.json()
        }).then((data) => {
            // console.log(data)
            let cityName = data.location.name
            let currentTempC = data.current.temp_c
            let currentTempF = data.current.temp_f
            let currentFeel = data.current.feelslike_c
            let condition = data.current.condition.text
            let country = data.location.country

            // Fetching data from localstorage
            let Weather = localStorage.getItem("weather");
            // Adding it validition
            if (Weather == null) {
                // Creating an empty Array 
                weathObj = [];
            }
            else {
                // parsing the localstorage data string to object
                weathObj = JSON.parse(Weather);
            }
            // Creating an object of data
            let myObj = {
                name: cityName,
                temp: currentTempC,
                tempf: currentTempF,
                condition: condition,
                country: country,
                // feel:currentFeel
            }
            // pushing myobj to weatherobj
            weathObj.push(myObj);
            // Setting data to lacalStorage in string format
            localStorage.setItem("weather", JSON.stringify(weathObj));

        });
        cityName.value = ""
        // calling showWeather() function which is show data in ui
        showWeather();

        e.preventDefault();
        setTimeout(() => {
            location.reload()
        }, 1500);
    };
};
// Creating a showWeather Function which get data from localstorage and show in ui
function showWeather() {
    let Weather = localStorage.getItem("weather");
    if (Weather == null) {
        weathObj = [];
    }
    else {
        weathObj = JSON.parse(Weather);
    }
    let str = "";
    // Adding ForEach Loop to weatherObj for fetching all the elements inside weatherObj
    weathObj.forEach(function (element, index) {
        str += `
                 <tr>
                 <td>${element.name}</td>
                 <td>${element.country}</td>
                 <td>${element.temp}&deg;C/${element.tempf} F</td>
                 <td>${element.condition}</td>
                 <td><button class="btn btn-primary"  id="${index}" onclick="deleteWeather(this.id)">delete</button></td>
               </tr>
                 `
        let tbody = document.getElementById('tbody');
        tbody.innerHTML = str;

    });
}
// Creating a delete function to delete item
function deleteWeather(index) {
    let Weather = localStorage.getItem("weather");
    if (Weather == null) {
        weathObj = [];
    }
    else {
        weathObj = JSON.parse(Weather);
    }
    // adding splice method to weatherObj because its an array so we can add array methods on it
    if (index == 0) {
        weathObj.splice(index, 1);
        location.reload()
    }
    else {
        weathObj.splice(index, 1);
    }
    localStorage.setItem("weather", JSON.stringify(weathObj));
    // calling showWeather function
    showWeather()
}
showWeather() // calling showWeather() function universally (Important)