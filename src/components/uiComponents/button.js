import React from 'react';
import './../../App.scss';
import './../../globalCSS/global.scss';
import './uiComponents.scss';

class Button extends React.Component {
  constructor(props) {
    super(props);   
  } 

  render() {  
    return (
      <button className={`btn ${this.props.btnStyle}`}>{this.props.children}</button>
    );
  }
}

export default Button;
