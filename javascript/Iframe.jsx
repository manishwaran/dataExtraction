import React from 'react';

var Iframe = React.createClass({
    onFrameLoaded: function(frame){
      var that = this;
      $(frame).contents().click(function(e){
        var output={}
        var cssSelector=$(e.target).getPath();
        var uniqueCssSelector=cssSelector.replace(/>/g," ");
        var idAry=e.target.getAttribute("id");
        var classAry=e.target.getAttribute("class");
        var str="";
        var flag=false
        if(idAry != null ){
          str+=idAry.toString();
          flag=true;
        }
        if(classAry != null ){
          if(flag)
            str+=","
          str+=classAry.toString();
        }
        output = {
          "css" : uniqueCssSelector,
          "attr": str
        }
        that.props.onSelect(output);
      });
    },
    render: function() {
      return (
        <iframe ref={this.onFrameLoaded} className="col col-lg-12" height="700px" allowfullscreen="" id="myIframe" sandbox="allow-same-origin allow-scripts"></iframe>
      );
    }
});

export default Iframe;
