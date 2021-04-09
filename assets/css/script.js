var submit = $('#citySubmit');

let map = L.map('map', {
  layers: MQ.mapLayer(),
  center: [30, -100],
  zoom: 12
});


submit.on("click",function(){
 var userInput = $('#pac-input').val();
   plotPoints(userInput);

});

function plotPoints(testing){

var myKey = "x08QCFTgZ7cpVNORuGWko7Lm6SMdF2WW";
// var SICString = "&hostedData=mqap.ntpois|group_sic_code=?|581302";
var SICString = "&hostedData=mqap.ntpois|group_sic_code=?|581303";

// var apiPrefix = "https://www.mapquestapi.com/search/v2/radius?center="+testing+"&radius=10&maxMatches=7&ambiguities=ignore&hostedData=mqap.ntpois|group_sic_code=?|581208&outFormat=json&key=";
var apiPrefix = "https://www.mapquestapi.com/search/v2/radius?center="+testing+"&radius=10&maxMatches=7&ambiguities=ignore&outFormat=json&key=";

var apiSuffix = "&maxMatches=4&origin="+testing+"&radius=12";

var apiString = apiPrefix+myKey+SICString+apiSuffix;
fetch(apiString, {
  cache: "reload"
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {

    map.setView(new L.LatLng(data.origin.displayLatLng.lat, data.origin.displayLatLng.lng), 12);
    

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
}
   console.log()



      // var lat = data.searchResults[0].fields.lat
    // var lng = data.searchResults[0].fields.lng
    // console.log(data.searchResults[0].fields.lat, data.searchResults[0].fields.lng);
    // console.log(data.searchResults[0].name)
    
    // L.marker([lat,lng], {
    //   // icon: L.mapquest.icons.marker(),
    //   draggable: false
    // }).bindPopup(data.searchResults[0].name).addTo(map);

