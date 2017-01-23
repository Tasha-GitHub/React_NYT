// Include React
var React = require("react");

// Here we include all of the sub-components
var Form = require("./children/Form");
var Articles = require("./children/articles");
var Saved = require("./children/saved");

// Helper for making AJAX requests to our API
var helpers = require("./utils/helpers");

// Creating the Main component
var Main = React.createClass({

  // Here we set a generic state associated with the number of clicks
  // Note how we added in this history state variable
  getInitialState: function() {
    return { searchTerm: "", startYear: "", endYear: "", results: [], savedArticles:[] };
  },
    setTerm: function(term, endyear, startyear) {
    this.setState({ searchTerm: term, endYear: endyear, startYear: startyear});
  },
  componentWillMount: function(){
    var self =this;
    helpers.getArticle("/api/saved")
      .then(function(response) {
        //console.log(response);
        //console.log(response.data)
        self.setState({
          savedArticles: response.data
        });
    });
  },
  setParent: function(results) {

    this.setState({
      results: results
    });
  },
  clickToSave: function(i, article){
    var self = this;
    var articleName = "article"+i;
    //console.log(i);
    //console.log(this.props.results[i]);
    var data = article;
    //console.log("----------------------")
    console.log(article);
    helpers.createArticle("/api/saved", data).then(function(response){
      //console.log(response);
      var newArray = self.state.savedArticles;
      newArray.push(article);
      // console.log(self.state.savedArticles)
      //console.log("-------------------")
      //console.log(newArray)
      self.setState({
        savedArticles: newArray 
      });
    });
  },
    // Here we render the function
  deleteArticle: function(i, id){
    var self = this;
    //console.log(id);
    helpers.deleteArticle("/api/saved/" + id).then(function(){
      //console.log("deleted");
      var savedArray = self.state.savedArticles;
      savedArray.splice(i,1);
      //console.log(savedArray);
      self.setState({
        savedArticles: savedArray
      })
    });

  },
  // Here we render the function
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron">
            <h2 className="text-center">Article Finder!</h2>
            <p className="text-center">
            </p>
          </div>
        </div>
          <div className="row">
            <div className="col-md-12">
              <Form setParent={this.setParent} />
            </div>
          </div>
        <div className="row">
          <div className="col-md-12">
            <Articles results={this.state.results} clickFunction={this.clickToSave} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Saved savedArticles={this.state.savedArticles} deleteArticle={this.deleteArticle} />
          </div>
        </div>

      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Main;
