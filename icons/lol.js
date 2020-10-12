var api_content;

function initMap(x, y) {
    let map;
    map = new google.maps.Map(document.getElementById("mark"), {
      center: { lat: x, lng: y},
      zoom: 8,
    });
}
function showpos(){
    if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(showPosition);
    document.getElementById("mark").style.opacity = 1;
    }else{
        document.getElementById("mark").innerHTML = `salardos`;
    }
}
function savedata(tempinfo){
 if(localStorage.getItem("box") === null){
     let weather = [];
     weather.push(tempinfo);
     localStorage.setItem("box", JSON.stringify(weather));
 }else{
   let weather = JSON.parse(localStorage.getItem("box"));
   weather.push(tempinfo);
   localStorage.setItem("box", JSON.stringify(weather));
 }

 
}

function getdata(){
    let getdata = JSON.parse(localStorage.getItem("box"));
    
}

function showPosition(position){
initMap(position.coords.latitude, position.coords.longitude);
$(function () {
    
    var loc = $("#city").val();
    $.ajax({url:"https://api.openweathermap.org/data/2.5/weather",
        dataType: "json",
        type: "GET",
        data: { q:loc, appid: "2adaf7d3903bf70d6b0c85e434696f9b", units: "metric"},
        success: function(d){

        try {
        api_content = d.weather[0].description;
        d.main.time = new Date();
       document.getElementById("newscreen").innerHTML = ` <div class="all"><div id="info"><h1>temperatura:${d.main.temp}°C</h1>
       <img src="http://openweathermap.org/img/wn/${d.weather[0].icon}@2x.png" alt="icon">
       <h2>temperatura mínima:${d.main.temp_min}°C<p>temperatura máxina:${d.main.temp_max}°C</p></h2>
      
       <p>presión:${d.main.pressure}</p>
       <p>humedad:${d.main.humidity}</p>
      
       </div>
       </div>`;
       document.querySelector(".xd").innerHTML="actualizar";
       savedata(d.main);
       console.log(d);
       
        }catch(error){
            console.log(error);
        }
        }
    
    });
});

}