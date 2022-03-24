
var ip
var latitude 
var longtitude 
var time
var country
var region
var isp
var geonameid

var map
var marker


function details(ip) {
    const url = "https://geo.ipify.org/api/v2/country,city?apiKey=at_droRpDjtZ3KAfXsxjCQgDWobfsYGU&ipAddress="
        fetch( url+ ip)
        .then(res => res.json())
        .then(info =>{
            latitude = info.location.lat
            longtitude = info.location.lng
            time = info.location.timezone
            country = info.location.country
            region = info.location.region
            geonameid = info.location.geonameId
            isp = info.isp

            document.getElementById("ip").innerHTML = ip
            document.getElementById("location").innerHTML = region + " , " + country 
            document.getElementById("timezone").innerHTML = "UTC " + time
            document.getElementById("isp").innerHTML = isp
            document.getElementById("ipInput").value = ip 

            map = L.map('map').setView([latitude,longtitude], 13);

            L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox/streets-v11',
                tileSize: 512,
                zoomOffset: -1,
                accessToken: 'pk.eyJ1IjoiYmhhcmF0aDY3MyIsImEiOiJja3k0Z3I5emUwYWw4MndudGdqc2pham8wIn0.IOjH0DCZriBY0rVft48i3A'
            }).addTo(map);
            marker = L.marker([latitude , longtitude]).addTo(map);
        })


}

fetch("https://api.ipify.org?format=json")
    .then(response => response.json())
    .then(data=>{
        ip = data.ip
        details(ip)
    })

document.getElementById("arrow").addEventListener("click",()=>{
   ip =  document.getElementById("ipInput").value
   map.remove()
   details(ip)
})









