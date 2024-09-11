let apiKey = "6fc4a4cb708c88e8a68654218cf5917a"
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?`
let weatherIcon = document.querySelector('.weather-icon') 

async function showWheather() {
    let search = document.querySelector('.search input').value.trim()

    let response = await fetch(apiUrl + `q=${search}&appid=${apiKey}`)
    let data = await response.json()

    document.querySelector('.temp').innerHTML =Math.round((data.main.temp - 273.15)) + "°C";
    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
    document.querySelector('.wind').innerHTML = data.wind.speed + " km/h"

    if(data.weather[0].main == 'Clouds'){
        weatherIcon.src = "images/clouds.png"
    }
    else if(data.weather[0].main == 'Clear'){
        weatherIcon.src = "images/clear.png"
    }
    else if(data.weather[0].main == 'Drizzle'){
        weatherIcon.src = "images/drizzle.png"
    }
    else if(data.weather[0].main == 'Rain'){
        weatherIcon.src = "images/rain.png"
    }
    else if(data.weather[0].main == 'Snow'){
        weatherIcon.src = "images/snow.png"
    }
    else if(data.weather[0].main == 'Mist'){
        weatherIcon.src = "images/mist.png"
    }
    document.querySelector('.weather').style.display='block'
}

document.querySelector('.btn').addEventListener('click', () => {
    showWheather();
})