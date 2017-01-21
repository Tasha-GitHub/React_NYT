// Include React
var React = require("react");
// Helper for making AJAX requests to our API
var helpers = require("../utils/helpers");

// Creating the Results component
var Saved = React.createClass({
   getInitialState: function() {
    return {results: []};
  },
  // Here we render the function
  componentDidMount: function(){
    var self =this;
    helpers.getArticle("/api/saved")
      .then(function(response) {
        //console.log(response);
        // Using a ternary operator we can set newClicks to the number of clicks in our response object
        // If we don't have any clicks in our database, set newClicks to 0
        console.log(response.data)
        self.setState({
          results: response.data
        });
    });
  },

  deleteArticle: function(){

  },
  render: function() {
    var self = this;
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center"> Saved Articles</h3>
        </div>
        <div className="panel-body text-center">

          {/* Here we use a map function to loop through an array in JSX */}
          {this.state.results.map(function(search, i) {
            return (
              <div key={i} ref={"article"+i} className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title text-center"> {search.title}</h3>
                </div>
                <div className="panel-body text-center">
                  <div  className="row">
                    <div  className="col-md-9">
                      <p  className>{search.url}</p>
                    </div>
                    <div className="col-md-3">
                      <button className="btn btn-primary" onClick={self.deleteArticle.bind(null, i)} type="submit"> Remove Saved Article </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Saved;
