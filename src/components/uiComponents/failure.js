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
      <div className="failure-text">
          {this.props.children}
      </div>
    );
  }
}

export default Failure;
