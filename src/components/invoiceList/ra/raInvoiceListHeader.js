import React from 'react';
import './../../../App.scss';
import './../../../globalCSS/global.scss';
import './../invoiceList.scss';
import DropDown from './../../dropDown/dropDown';
import { Route, Link } from "react-router-dom";
import NavBar from './../../navBar/navBar';
import { withRouter } from "react-router-dom";
import PropTypes from 'prop-types';

const axios = require('axios');



class RAInvoiceListHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      userDetails:this.props.userDetails,
      activeFilter: "All",
      showDropDown:false,
    }

  } 

  filterShowHandler=()=>{
    this.setState({
      showDropDown: !this.state.showDropDown
    })
  }
 
  filterChangeHandler=(filter)=>{
    let invoicesData=[...this.props.invoiceList];
    if(filter==="Review Pending"){
      invoicesData=invoicesData.filter(invoice=>invoice.invoice_status==="REVIEW_PENDING");   
    }
    else if(filter==="Approval Pending"){
      invoicesData=invoicesData.filter(invoice=>invoice.invoice_status==="APPROVAL_PENDING");   
    }

    else if(filter==="Approved"){
      invoicesData=invoicesData.filter(invoice=>invoice.invoice_status==="APPROVED");   
    }
    this.setState({
      activeFilter:filter,
      showDropDown: !this.state.showDropDown,
    })
    this.props.getFilteredInvoices(invoicesData);
  }

  uploadPending=()=>{
    let invoicesData  = [...this.props.invoicesData];
    invoicesData=invoicesData.filter(invoice=>invoice.invoice_status==="UPLOADED");   
  }

  header=()=>{
    const filters=["All","Review Pending","Approved","Approval Pending"];
    let header=       
        <div className="raHeader">
        <h1 className="invoice-title">
            Invoice List
        </h1>
        <div className="filtering">
            <div className="filterBy-text">Filter by</div>
            <div  className="filter-container">
            <div onClick={this.filterShowHandler} className="chooseFilter">
                {this.state.activeFilter}
                <i className="fa fa-caret-down" aria-hidden="true"></i>
            </div>
            <DropDown show={this.state.showDropDown} top={"50px"} left={"-90px"} width={"250px"}>
                <ul>
                {filters.map(filter=><li key={filter} onClick={()=>this.filterChangeHandler(filter)}>{filter}</li>)}
                </ul>  
            </DropDown>
            </div>
        </div>
      </div>  
    if(this.state.userDetails.userType==="FINANCE")
    header= 
        <div className="financeHeader">
            <div className="leftItems"> 
            <p className="invoice-title"> Invoice Payment </p>
            <div className="financeSort-btns">
                <button onClick={this.uploadPending} className="pending">Pending</button>
                <button  className="uploaded">Uploaded</button>
            </div>
            </div>
            <div className="rightItems">
            <button  className="upload">Upload</button>
            </div>
        </div>        
    return header
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

export default withRouter(RAInvoiceListHeader);
