
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


  for (i=0; i<2; i++){
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
  // async function f1(searchFor) {
  // var test = await returnAudius(searchFor);
  // console.log("await");
  // console.log(youtubeSearchObj);
  // return youtubeSearchObj;
};

// aysnc function test(){
getYoutubeSearchObj("Aqua Lounge, Richmond VA");


