import React from 'react';
import './../../App.scss';
import './../../globalCSS/global.scss';
import './invoiceList.scss';
import DropDown from '../dropDown/dropDown';
import { Route, Link } from "react-router-dom";
import InvoiceTable from './invoiceTable';
import NavBar from './../navBar/navBar';
import { withRouter } from "react-router-dom";
import PropTypes from 'prop-types';

const axios = require('axios');



class InvoiceListContainer extends React.Component {
  constructor(props) {
    super(props);
    console.log(localStorage);
    this.state={
      userDetails:"JSON.parse(localStorage.userDetails)",
      invoicesData:[],
      filteredInvoices:[],
      activeFilter: "All",
      showDropDown:false,
    }

  } 

  //  RA and RASignatory functions#########

  filterShowHandler=()=>{
    this.setState({
      showDropDown: !this.state.showDropDown
    })
  }
 
  filterChangeHandler=(filter)=>{
    let invoicesData=[...this.state.invoicesData];
    if(filter==="Review Pending"){
      invoicesData=invoicesData.filter(invoice=>invoice.reviewStatus==="false");   
    }
    else if(filter==="Approval Pending"){
      invoicesData=invoicesData.filter(invoice=>invoice.approvalStatus==="false");   
    }
    else if(filter==="Reviewed"){
      invoicesData=invoicesData.filter(invoice=>invoice.reviewStatus==="true");   
    }
    else if(filter==="Approved"){
      invoicesData=invoicesData.filter(invoice=>invoice.approvalStatus==="true");   
    }
    this.setState({
      activeFilter:filter,
      showDropDown: !this.state.showDropDown,
      filteredInvoices:invoicesData
    })
  }
//  finance functions#########

  uploadPending=()=>{
    let invoicesData  = [...this.state.invoicesData];
    invoicesData=invoicesData.filter(invoice=>invoice.approvalStatus==="true");   
    this.setState({
      filteredInvoices:invoicesData
    })
  }

// Life Cycle Methods#########

  componentDidMount(){
    axios.get('http://18.218.231.206/api/ra_signatory/invoices', 
      { 
        headers:{"Authorization": `Bearer ${localStorage.token}`},
        params:{
          invoice_ra_signatory_id:2
        }
      }
      )
      .then( resp => {
          console.log(resp.data)
          if(resp.data !== null){
            this.setState(
              {
                invoicesData:resp.data,
                filteredInvoices:resp.data,
              }
            ,this.filterInvoices);
          }
          else{
          alert("no invoices")
          }
        }
        )
        .catch( err => {
            console.log("Login Error", err)
        })
  }

  filterInvoices=()=>{
    this.setState(
      {
        filteredInvoices:this.state.invoicesData
      }
    )
  }
  // Render Method#########

  render() {
    console.log(this.state.filteredInvoices);
    const filters=["All","Review Pending","Reviewed","Approved","Approval Pending"];
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
        
    if(this.state.userType==="finance"){
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
    }
    // console.log(this.state.filteredInvoices);
    return (
      
      <div className="app">
        <NavBar showAvatar={true}/>
        <div className="appContainer-margin"> 
          <div className="invoiceList-container">
            <div className="invoiceList-header">
                {header}
            </div> 
            <InvoiceTable userDetails={this.state.userDetails} filteredInvoices={this.state.filteredInvoices}/>
          </div> 
        </div>
      </div>       
    );
  }
}



export default withRouter(InvoiceListContainer);
