import React from 'react';

var UrlBox = React.createClass({
  getInitialState: function() {
    return {url: ""};
  },
  handleChange: function(event) {
    this.setState({ url: event.target.value });
  },
  submitUrl: function(e){
   e.preventDefault();
   this.props.load(this.state.url);
   this.setState({ url:"" })
  },
  render: function() {
    return (
      <form id="myform" className="well clearfix">
        <div className="col-lg-7 col-sm-7">
          <input className="form-control" onChange={this.handleChange} value={this.state.url}/>
        </div>
        <button className="btn btn-primary pull-left" disabled={this.state.url.length === 0} onClick={this.submitUrl}>Load Url</button>
      </form>
    );
  }
});

export default UrlBox;
