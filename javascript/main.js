import React from 'react';
import ReactDOM from 'react-dom';
import UrlBox from './UrlBox.jsx';
import ResultBox from './ResultBox.jsx';
import LeftPanel from './LeftPanel.jsx';
import Iframe from './Iframe.jsx';

var App = React.createClass({
  getInitialState : function(){
    return {
      url:"",
      obj: [],
      jsonInput: [],
      jsonOutput: []
    };
  },
  onSelect: function(input) {
    this.setState({ obj:input });
  },
  executeQuery: function(data){
    this.state.jsonInput=data;
    var _this=this
    $.post("/getresult",{data: JSON.stringify(this.state.jsonInput)},function(data, status){
      _this.setState({ jsonOutput:data });
      console.log(_this.state.jsonOutput);
    });
  },
  loadUrl : function(submittedUrl){
    this.state.url=submittedUrl;
    this.setState({ jsonInput:[] })
    this.setState({ jsonOutput:[] })
    alert(this.state.jsonInput.length)
    $.post("/loadwebpage",{"url":this.state.url},function(data, status){
      $('#myIframe').contents().find('body').html(data);
    });
  },
  render : function(){
     return(
       <div>
        <div className="row">
          <UrlBox load={this.loadUrl} val={this.state.url}/>
        </div>
        <div className="row" style={{padding:25}}>
          <div  className="col col-lg-7" >
            <div className="row">
              <Iframe url={this.state.url} onSelect={this.onSelect}/>
            </div>
            <div className="row">
              <ResultBox result={this.state.jsonOutput}/>
            </div>
          </div>
          <div className="col col-lg-4">
            <LeftPanel  parseData={this.executeQuery} input={this.state.obj} />
          </div>
        </div>
       </div>
     );
   }
});

jQuery.fn.extend({
    getPath: function () {
        var path, node = this;
        console.log("getPath");
        while (node.length) {
            var realNode = node[0], name = realNode.localName;
            if (!name) break;
            name = name.toLowerCase();

            var parent = node.parent();

            var sameTagSiblings = parent.children(name);
            if (sameTagSiblings.length > 1) {
                var allSiblings = parent.children();
                var index = allSiblings.index(realNode) + 1;
                if (index > 1) {
                    name += ':nth-child(' + index + ')';
                }
            }

            path = name + (path ? '>' + path : '');
            node = parent;
        }
        return path;
    }
});

ReactDOM.render(<App />,document.getElementById("container"));
