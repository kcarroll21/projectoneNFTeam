var search = $('submit');
var userInput = $('input');


let map = L.map('map', {
  layers: MQ.mapLayer(),
  center: [37.541290, -77.434769],
  zoom: 12
});
  
const myKey = "x08QCFTgZ7cpVNORuGWko7Lm6SMdF2WW";
const SICString = "&hostedData=mqap.ntpois|group_sic_code=?|581302";
// const SICString = "query=bars";
// const SICString = "&q=Live%20Music";
const apiPrefix = "https://www.mapquestapi.com/search/v2/radius?origin=Denver,+CO&radius=0.15&maxMatches=3&ambiguities=ignore&hostedData=mqap.ntpois|group_sic_code=?|581208&outFormat=json&key=";
const apiSuffix = "&maxMatches=4&origin=Richmond,+VA&radius=12";
// const apiSuffix = "&maxMatches=4&origin=Richmond,+VA&radius=12";
const apiString = apiPrefix+myKey+SICString+apiSuffix;
fetch(apiString, {
  cache: "reload"
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });



$('search').on('click', function(){
  const myKey = "x08QCFTgZ7cpVNORuGWko7Lm6SMdF2WW";
  // const SICString = "&hostedData=mqap.ntpois|group_sic_code=?|581301";
  // const SICString = "query=bars";
  const SICString = "&q=Live%20Music";
  const apiPrefix = "http://www.mapquestapi.com/search/v2/radius?key=";
  var citySearch = userInput;
  var apiSuffix = "&maxMatches=20&origin="+citySearch+"&radius=10";
  const apiString = apiPrefix+myKey+SICString+apiSuffix;
  fetch(apiString, {
    cache: "reload"
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
 })


//   var dir = MQ.routing.directions();

// dir.route({
//     locations: [
//         'Richmond, VA'
//     ]
// });

// CustomRouteLayer = MQ.Routing.RouteLayer.extend({
//     createStartMaker: (location) => {
//         var custom_icon;
//         var marker;

//         custom_icon = L.icon({
//             iconUrl: 'assets/red.png',
//             iconSize: [20, 29],
//             iconAnchor: [10, 29],
//             popupAnchor: [0, -29]
//         });

//         marker = L.marker(location.latLng, {icon: custom_icon}).addTo(map);

//         return marker;
//     },


// });

// map.addLayer(new CustomRouteLayer({
//     directions: dir,
//     fitBounds: true
// }));
