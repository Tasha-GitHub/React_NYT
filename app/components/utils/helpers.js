// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");

// Helper functions for making API Calls
var helper = {

  // This function serves our purpose of running the query to geolocate.
  runQuery: function(location) {
    var article  = "dogs";
    var startYear = "19500101";
    var endYear = "20160101";
    var key = "3283107effc84af7965500f03014c457";
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + article +"&begin_date="+ startYear +"&end_date="+endYear+ "&api-key=" + key;
    return axios.get(queryURL);
  },
   // Returns a promise object we can .then() off inside our Parent component
  getArticle: function(url) {
    return axios.get(url);
  },
  // Also returns a promise object we can .then() off inside our Parent component
  // This method takes in an argument for what to post to the database
  deleteArticle: function(url) {
    return axios.post(url);
  },
  createArticle: function(url, data){
    console.log(url + data)
    return axios.post(url, data);
  }
};

// We export the API helper
module.exports = helper;
