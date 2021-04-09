var submit = $('#citySubmit');

let map = L.map('map', {
  layers: MQ.mapLayer(),
  center: [30, -100],
  zoom: 12
});


submit.on("click",function(){
 var userInput = $('#pac-input').val();
  getYoutubeSearchObj("live music,"+userInput);
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



    //youtube script follows:
    //******************************************** 

    




var urlHeader = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=";
var searchString = "The Camel, Richmond VA";
var keyString = "&key=AIzaSyBrmvs545b9-qoXsiaF3flsvdqWxaSgmFc";
var APIUrl = urlHeader+searchString+keyString;
const channelPrefix = "https://www.youtube.com/channel/";
const videoPrefix =  "https://www.youtube.com/watch?v=";

// var youtubeSearchObj = JSON.parse(localStorage.getItem("youtubeSearchObj"));

var youtubeSearchObj={};
var responseObject = {
    "Type": "video",
    "Link": "",
    "ID": "",
    "Title": "",
    "Description": "",
    "Thumbnail":""};

function populateYoutubeCard(){

var maxItems = 3;
  for (i=0; i<maxItems; i++){
    var itemNumber = i + 1;
    var itemTag = "#youtube-"+itemNumber;
    var youtubeCard = $(itemTag);
    var titleEl = youtubeCard.children(".youtube-title");
    var descriptionEl = youtubeCard.children('p');
    var youtubeLinkEl = youtubeCard.children("a");
    var thumbnailEl = youtubeCard.children("a").children("img");
    console.log(youtubeSearchObj);
    var currentItem = youtubeSearchObj.items[i];
    console.log(currentItem); 
    if (currentItem.id.kind === "youtube#channel") {
        responseObject.ID = currentItem.id.channelId;
        responseObject.Link = channelPrefix+responseObject.ID;
        console.log("this is a channel");
    } else if (currentItem.id.kind === "youtube#video") {
        responseObject.ID = currentItem.id.videoId;
        responseObject.Link = videoPrefix+responseObject.ID;
        console.log("this is a video");
    };

    responseObject.Title = currentItem.snippet.title;
    responseObject.Description = currentItem.snippet.description;
    responseObject.Thumbnail = currentItem.snippet.thumbnails.medium.url;

    titleEl.text(responseObject.Title);
    descriptionEl.text(responseObject.Description);
    thumbnailEl.attr("src", responseObject.Thumbnail);
    youtubeLinkEl.attr("href", responseObject.Link);
    console.log(responseObject);
  };
};


async function getYoutubeSearchObj(mySearchString){
  var myUrl = urlHeader+mySearchString+keyString;

  var myReponse = await fetch(myUrl,
  {
    method: 'GET',
    // headers: headers
  })
  .then(function(res) {
    console.log(res);  
    return res.json();
  }).then(function(body) {    
    youtubeSearchObj = body;
    console.log(youtubeSearchObj);
    localStorage.setItem("youtubeSearchObj", JSON.stringify(body));
   return; 
  });
    

  populateYoutubeCard();
};

