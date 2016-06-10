import React from 'react';

var LeftPanel = React.createClass({
  getInitialState: function() {
    return {
      element: [],
      obj: [],
      jsonData: []
    };
  },
  addDivision: function(){
    var element = <AppendItem input={this.props.input}/>
    this.setState({ obj:this.props.input })
    var preState = this.state.element
    var newState = preState.concat(element);
    this.setState({  element: newState });
    if(this.state.element.length>0){
      this.state.jsonData.push(this.state.obj)
    }
  },
  processQuery: function(){
    console.log("processing query . . .1");
    this.state.jsonData.push(this.state.obj)
    this.props.parseData(this.state.jsonData);
    this.setState({ jsonData:[] })
  },
  clearQuery: function(){
    this.setState({element: []});
  },
  deleteElement: function(a) {
    this.state.element.splice(a, 1);
    this.setState({element: this.state.element});
  },
  render: function(){
    var _this=this;
    global_id=this.state.element.length;
    var createDivision = function(item,i) {
      return(
        <div id={"append"+i} className="append-box">
            <div id='close' style={{float: 'right',color:'red'}} onClick={_this.deleteElement.bind(null, i)} >close</div>
            {item}
        </div>
      );
    };
    return(
      <div>
        <button className="btn btn-default" onClick={this.addDivision} style={{margin:10}}> + </button>
        <button className="btn btn-primary" onClick={this.processQuery} style={{margin:10}}> Execute </button>
        <button className="btn btn-primary" onClick={this.clearQuery} style={{margin:10}}> Clear </button>
        {this.state.element.map(createDivision)}
      </div>
    );

  }
});


export default LeftPanel;
