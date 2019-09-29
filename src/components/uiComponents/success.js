import React from 'react';
import './../../App.scss';
import './../../globalCSS/global.scss';
import './uiComponents.scss';

class Success extends React.Component {
  constructor(props) {
    super(props);   
  } 

  render() {  
    return (
      <div className="reviewed">
          <p className="reviewed-text">{this.props.children}</p>
          <div className="check-circle"><i className="fa fa-check"></i></div> 
      </div>
    );
  }
}

export default Success;
