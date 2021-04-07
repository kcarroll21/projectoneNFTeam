/*
This code pulls the lat long for a city
center (or other location) from SearchAPI from
Mapquest.
 
*/

const KEY = "x08QCFTgZ7cpVNORuGWko7Lm6SMdF2WW"; //API Key from Mapquest
var apiPrefix = "https://www.mapquestapi.com/search/v2/radius?origin="; //prefix for API endpoint
// var apiString = "https://www.mapquestapi.com/search/v2/radius?origin=denver,CO&radius=0.15&maxMatches=3&ambiguities=ignore&hostedData=mqap.ntpois|group_sic_code=?|581208&outFormat=json&key="+KEY;
var apiSuffix = "&radius=0.15&maxMatches=3&ambiguities=ignore&hostedData=mqap.ntpois|group_sic_code=?|581208&outFormat=json&key="+KEY;
// const qString = "&q=live music";

var coordinates = {
  lat: 0,
  long: 0
  };
 //I put this in here as a test.  If we ran into an sync issue, 0,0 would show up. 


function findLatLong(myLocationStr){

var apiString = apiPrefix+myLocationStr+apiSuffix;
  console.log(apiString);
  var myResponse = fetch(apiString, {
    method: 'GET',
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data.origin.displayLatLng);
      // console.log(data.origin.displayLatLng.lng);
      console.log(data.origin.displayLatLng.lat);
      coordinates.lat = data.origin.displayLatLng.lat;
      coordinates.lng = data.origin.displayLatLng.lng;
    }).then(function(){
      console.log(coordinates.lng);
      /* because of the sync issues, any code you wanted to execute
      woudl have to go here. */
      
      return;
    })


};


//This is a test.  You can put in any city,state in city search.
//it will console log the lat long

var citySearch = "Nashville, TN";

  findLatLong(citySearch);
  

