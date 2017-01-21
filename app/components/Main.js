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
    return { searchTerm: "", startYear: "", endYear: "", results: [], history:"results" };
  },
    setTerm: function(term, endyear, startyear) {
    this.setState({ searchTerm: term, endYear: endyear, startYear: startyear});
  },  
  //  On load display the number of clicks
  componentDidMount: function() {
    console.log("COMPONENT MOUNTED");

    // The moment the page renders on page load, we will retrieve the previous click count.
    // We will then utilize that click count to change the value of the click state.
  },
  setParent: function(results) {

    this.setState({
      results: results
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
            <Articles results={this.state.results} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Saved address={this.state.history} />
          </div>
        </div>

      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Main;
