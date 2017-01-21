var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: {
    type: String
  },
  date: {
    type: Date
  },
  url: {
  	type: String
  },
  saved: {
  	type: Boolean
  }, 
  notes: []

});

var Articles = mongoose.model("Articles", ArticleSchema);
module.exports = Articles;
