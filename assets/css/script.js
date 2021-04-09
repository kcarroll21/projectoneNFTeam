var submit = $('submit');
var userInput = $('input');
var userInput = $('pac-input');

submit.on("click", plotPoints("Nashville,TN") );



function plotPoints(testing){
// var testing = "Denver,CO"
const myKey = "x08QCFTgZ7cpVNORuGWko7Lm6SMdF2WW";
const SICString = "&hostedData=mqap.ntpois|group_sic_code=?|581302";
// const SICString = "query=bars";
// const SICString = "&q=Live%20Music";
const apiPrefix = "https://www.mapquestapi.com/search/v2/radius?center="+testing+"&radius=10&maxMatches=7&ambiguities=ignore&hostedData=mqap.ntpois|group_sic_code=?|581208&outFormat=json&key=";
const apiSuffix = "&maxMatches=4&origin="+testing+"&radius=12";
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

