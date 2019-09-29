import React from 'react';
import './../../../App.scss';
import './../../../globalCSS/global.scss';
import './invoiceHeader.scss';
import InvoiceHeaderLeft from './invoiceHeaderLeft';
import { Route, Link } from "react-router-dom";


class InvoiceHeaderContainer extends React.Component {
  constructor(props) {
    super(props);   
    this.state={
    }
  } 

  render() {  
    return (
       <div className="invoiceList-header">
            <div className="back">
              <Link to="./invoiceList">
                  <i className="fa fa-arrow-left"></i>
              </Link>
              <h1 className="invoice-title">
                  Invoice List  
              </h1>
            </div>    
            <InvoiceHeaderLeft userType={this.props.userType} invoiceStatus={this.props.invoiceStatus} changeStatusHandler={this.props.changeStatusHandler}/>
      </div> 
    );
  }
}

export default InvoiceHeaderContainer;