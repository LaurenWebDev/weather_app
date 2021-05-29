//Weather Class
class Weather {
  constructor() {
    this.apiKey = "8a65df821db6c3a12bff75af42565064";
  }

  //get Weather from Geo Location
  async getWeatherFromGeo(lon, lat) { 
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${this.apiKey}`);
    const responseData = await response.json();
    return responseData; 
  }

  //get Weather from zipCode 
  async getWeatherFromZip(zipCode) { 
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&units=imperial&appid=${this.apiKey}`);
    const responseData = await response.json();
    return responseData; 
  }
}

//UI Class
class UI {
  constructor() {
    this.cityDisplay = document.getElementById('city-display');
    this.icon = document.getElementById('icon');
    this.weatherDescr = document.getElementById('weather-descr');
    this.tempDisplay = document.getElementById('temp-display');
  }

  //display to ui
  dispWeather(weather){
    this.tempDisplay.innerHTML = `${Math.round(weather.main.temp)}&deg`;
    this.cityDisplay.textContent = weather.name;
    this.weatherDescr.textContent = weather.weather[0].main;
    this.icon.classList.add(`wi-owm-${weather.weather[0].id}`) 
  }
}

const weather = new Weather;
const ui = new UI;

//Modal Submit Location Event Listener
document.getElementById('search-btn').addEventListener('click', function(e){
  let zipCode = document.getElementById('zip-input').value
  sessionStorage.setItem('zipCode', zipCode);
})

//Page Load Event Listener
window.addEventListener('DOMContentLoaded',()=>{ 
  //get zip code from session storage, search and display weather
  zipCode = sessionStorage.getItem('zipCode');
  if (zipCode) {
  weather.getWeatherFromZip(zipCode)
  .then(weather => {
    ui.dispWeather(weather);
    console.log(weather);        
    })
    .catch(err => console.log(err));
    if (err = ("404 (Not Found")){
      console.log("Can't find your location, try again");
    }
  }  
})

//Event Listener to Search by Geo Location
document.getElementById('geo-btn').addEventListener('click', function(e){
  navigator.geolocation.watchPosition(function(position) {
    navigator.geolocation.getCurrentPosition(
      position =>{
        lon = position.coords.longitude;
        lat = position.coords.latitude;
        weather.getWeatherFromGeo(lon, lat)
          .then(weather => {
            ui.dispWeather(weather);  
            console.log(weather);       
          })
          .catch(err => console.log(err))
        })        
  },
  function(error) {
    if (error.code == error.PERMISSION_DENIED)
      alert("You must turn on your Browser's Location");
  });
})

//Modal from Materialize
document.addEventListener('DOMContentLoaded', function() {
  const elems = document.querySelectorAll('.modal');
  const instances = M.Modal.init(elems);
});










