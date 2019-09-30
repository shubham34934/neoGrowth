import React from 'react';
import './../../../App.scss';
import './../../../globalCSS/global.scss';
import './../invoiceList.scss';
import DropDown from './../../dropDown/dropDown';
import { Route, Link } from "react-router-dom";
import NavBar from '../../navBar/navBar';
import PropTypes from 'prop-types';
import './finance.scss';

const axios = require('axios');



class FinanceInvoiceListHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      userDetails:this.props.userDetails,
      activeFilter: "Pending",
      uploadActive:false
    }
  } 

  handleUpload=()=>{
      
  }

  handleClick=(btn)=>{
    this.setState({
      activeFilter:btn
    })
    this.props.onFilterClick(btn)
  }

  header=()=>{
    let PendingBtnStyle="disabled"
    let UploadedBtnStyle="disabled"
    let UploadBtnStyle="disabled"
    if(this.state.uploadActive)
      UploadBtnStyle=""  
    if(this.state.activeFilter==="Pending")
      PendingBtnStyle=""
    if(this.state.activeFilter==="Uploaded")
       UploadedBtnStyle=""
  
    return <div className="financeHeader">
              <div className="leftItems"> 
              <p className="invoice-title"> Invoice Payment </p>
              <div className="financeSort-btns">
                  <button onClick={()=>this.handleClick("Pending")} className={`pendingBtn ${PendingBtnStyle}`}>Pending</button>
                  <button  onClick={()=>this.handleClick("Uploaded")} className={`uploadedBtn ${UploadedBtnStyle}`}>Uploaded</button>
              </div>
              </div>
              <div className="rightItems">
              <button onClick={()=>this.handleUpload()}  className={`uploadBtn ${UploadBtnStyle}`}>Upload</button>
              </div>
          </div>        
  }
  render() {   
    return (    
          <div>
            <div className="invoiceList-header">
            {this.header()}
            </div> 
          </div>
        
      
    );
  }
}

export default FinanceInvoiceListHeader;
