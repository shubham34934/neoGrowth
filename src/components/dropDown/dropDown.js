import React from 'react';
import './../../globalCSS/global.scss';
import './dropDown.scss';

class DropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      show:this.props.show
    }
  }

  render() {
    const dropDownStyle={
      top:this.props.top,
      left:this.props.left,
      height:this.props.height,
      width:this.props.width
    }

    let dropDownShow="hide heightZero";
    if(this.props.show){
      dropDownShow="show dropDown-container"
    }
    return (
      <div style={dropDownStyle} className={dropDownShow}>
        <ul>
          {this.props.children}
        </ul>
      </div>
    );
  }
}
export default DropDown;
