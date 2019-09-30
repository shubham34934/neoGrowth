import React from 'react';
import './../../App.scss';
import './../../globalCSS/global.scss';
import './invoiceList.scss';

class Test extends React.Component {
  constructor(props) {
    super(props);   
    this.state={
    }
  } 

  render() {  
    console.log(this.props)
    return (
        <div className="invoiceList-body">
    
        </div>
    );
  }
}

export default Test;
