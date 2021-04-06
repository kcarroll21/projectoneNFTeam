var urlHeader = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=";
var searchString = "The Camel, Richmond VA";
var keyString = "&key=AIzaSyBrmvs545b9-qoXsiaF3flsvdqWxaSgmFc";
var APIUrl = urlHeader+searchString+keyString;
var titleEl = $("#youtube-title");
var descriptionEl = $('#youtube-description');
var thumbnailEl = $("#youtube-thumbnail");
var youtubeLinkEl = $("#youtube-link");


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
  console.log(youtubeSearchObj);
  var firstItem = youtubeSearchObj.items[0];
  // console.log(firstItem); 
  if (firstItem.id.kind === "youtube#channel") {
      responseObject.ID = firstItem.id.channelId;
      responseObject.Link = channelPrefix+responseObject.ID;
      console.log("this is a channel");
  } else if (firstItem.id.kind === "youtube#video") {
      responseObject.ID = firstItem.id.videoId;
      responseObject.Link = videoPrefix+responseObject.ID;
      console.log("this is a video");
  };

  responseObject.Title = firstItem.snippet.title;
  responseObject.Description = firstItem.snippet.description;
  responseObject.Thumbnail = firstItem.snippet.thumbnails.medium.url;

  titleEl.text(responseObject.Title);
  descriptionEl.text(responseObject.Description);
  thumbnailEl.attr("src", responseObject.Thumbnail);
  youtubeLinkEl.attr("href", responseObject.Link);
  console.log(responseObject);
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
  // async function f1(searchFor) {
  // var test = await returnAudius(searchFor);
  console.log("await");
  console.log(youtubeSearchObj);
  return youtubeSearchObj;
};

// aysnc function test(){
getYoutubeSearchObj("The Tin Pan, Richmond VA");


