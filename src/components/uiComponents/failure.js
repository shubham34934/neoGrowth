import React from 'react';
import './../../App.scss';
import './../../globalCSS/global.scss';
import './uiComponents.scss';

class Failure extends React.Component {
  constructor(props) {
    super(props);   
  } 

  render() {  
    return (
      <div className="rejected">
        <p className="failure-text">{this.props.children}</p>
        <div className="cross-circle"><i className="fa fa-times"></i></div> 
      </div>
    );
  }
}

export default Failure;
