import React from 'react';
import './../../App.scss';
import './../../globalCSS/global.scss';
import './uiComponents.scss';

class Pending extends React.Component {
  constructor(props) {
    super(props);   
  } 

  render() {  
    return (
      <div className="pending-text">
          {this.props.children}
      </div>
    );
  }
}

export default Pending;
