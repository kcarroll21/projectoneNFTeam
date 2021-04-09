var search = $('submit');
var userInput = $('input');
var userInput = $('pac-input');
// const KEY ="x08QCFTgZ7cpVNORuGWko7Lm6SMdF2WW";
// var apiPrefix = "https://www.mapquestapi.com/search/v2/radius?origin=";
// var apiSuffix = "&radius=0.15&maxMatches=3&ambiguities=ignore&hostedData=mqap.ntpois|group_sic_code=?|581208&outFormat=json&key="+KEY;
// var coordinates = {
//   lat: 0,
//   long:0
// };


// This function is what loads the MapQuest map on the page.


// function findLatLong(myLocationStr){

//   var apiString = apiPrefix+myLocationStr+apiSuffix;
//     console.log(apiString);
//     var myResponse = fetch(apiString, {
//       method: 'GET',
//     })
//       .then(function (response) {
//         return response.json();
//       })
//       .then(function (data) {
//         // console.log(data.origin.displayLatLng);
//         // console.log(data.origin.displayLatLng.lng);
//         console.log(data.origin.displayLatLng.lat);
//         coordinates.lat = data.origin.displayLatLng.lat;
//         coordinates.lng = data.origin.displayLatLng.lng;
//       }).then(function(){
//         console.log(coordinates.lng);
//         /* because of the sync issues, any code you wanted to execute
//         woudl have to go here. */
        
//         return;
//       })
  
  
//   };
  
  
//   //This is a test.  You can put in any city,state in city search.
//   //it will console log the lat long
  
//   var citySearch = "Nashville, TN";
  
//     findLatLong(citySearch);
    





const myKey = "x08QCFTgZ7cpVNORuGWko7Lm6SMdF2WW";
const SICString = "&hostedData=mqap.ntpois|group_sic_code=?|581302";
// const SICString = "query=bars";
// const SICString = "&q=Live%20Music";
const apiPrefix = "https://www.mapquestapi.com/search/v2/radius?center=Denver,+CO&radius=10&maxMatches=7&ambiguities=ignore&hostedData=mqap.ntpois|group_sic_code=?|581208&outFormat=json&key=";
const apiSuffix = "&maxMatches=4&origin=Denver,+CO&radius=12";
//This is what controls the view & results 
// const apiSuffix = "&maxMatches=4&origin=Richmond,+VA&radius=12";
const apiString = apiPrefix+myKey+SICString+apiSuffix;
fetch(apiString, {
  cache: "reload"
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {

    let map = L.map('map', {
      layers: MQ.mapLayer(),
      center: [data.origin.displayLatLng.lat, data.origin.displayLatLng.lng],
      zoom: 12
    });
    

    console.log(data.origin.displayLatLng.lng)
    for (var i = 0; i < data.searchResults.length; i++){
      var lat = data.searchResults[i].fields.lat
      var lng = data.searchResults[i].fields.lng
      console.log(data.searchResults[i]);
      L.marker([lat,lng], {
        // icon: L.mapquest.icons.marker(),
        draggable: false
      }).bindPopup(data.searchResults[i].name).addTo(map);
    }
  });
  
   console.log()



      // var lat = data.searchResults[0].fields.lat
    // var lng = data.searchResults[0].fields.lng
    // console.log(data.searchResults[0].fields.lat, data.searchResults[0].fields.lng);
    // console.log(data.searchResults[0].name)
    
    // L.marker([lat,lng], {
    //   // icon: L.mapquest.icons.marker(),
    //   draggable: false
    // }).bindPopup(data.searchResults[0].name).addTo(map);

