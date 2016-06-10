import React from 'react';

var ResultBox = React.createClass({
  getInitialState: function(){
    return {
      resultJson: []
    };
  },
  render: function() {
    var createDivision = function(item,i) {
      return(
        <div>
        <h4>
          <div className="badge" style={{padding:10}}>Result :{i+1}</div>
          <div className="label label-info" style={{padding:10}} >  {item.val} </div>
        </h4>
        </div>
      );
    };
    return (
      <div>
        <h2>
          <label className="label label-success">Result : </label>
        </h2>
        <div className="row panel panel-heading" id="result">
          {this.props.result.map(createDivision)}
        </div>
      </div>
    );
  }
});

export default ResultBox;
