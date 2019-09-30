import React from 'react';
import './../../App.scss';
import './../../globalCSS/global.scss';
import './invoiceList.scss';
import DropDown from '../dropDown/dropDown';
import { Route, Link } from "react-router-dom";
import RAInvoiceTable from './ra/raInvoiceTable';
import FinanceInvoiceTable from './finance/financeInvoiceTable';
import NavBar from './../navBar/navBar';
import { withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import RAInvoiceListHeader from './ra/raInvoiceListHeader';
import FinanceInvoiceListContainer from './finance/financeInvoiceListContainer';

const axios = require('axios');



class InvoiceListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      // userDetails:JSON.parse(localStorage.userDetails),
      userDetails:{userType:"FINANCE"},
      invoicesData:[],
      filteredInvoices:[],
    }
  } 

  componentDidMount(){
   let list=[]
   if(this.state.userDetails.userType==="RA_SIGNATORY")
    list=
    axios.get('http://18.218.231.206/api/ra_signatory/invoices', 
      { 
        headers:{"Authorization": `Bearer ${localStorage.token}`},
        params:{
          invoice_ra_signatory_id:this.state.userDetails.userId
        }
      }
      )
      .then( resp => {
          console.log(resp.data)
          if(resp.data !== null){
            this.setState(
              {
                invoicesData:resp.data,
                filteredInvoices:resp.data
              }
            );
          }
          else{
          alert("no invoices")
          }
        }
        )
        .catch( err => {
            console.log("Login Error", err)
        })

        else if(this.state.userDetails.userType==="FINANCE")
        list=
        axios.get('http://18.218.231.206/api/finance/invoices', 
          { 
            headers:{"Authorization": `Bearer ${localStorage.token}`},
            params:{
              invoice_ra_signatory_id:2
            }
          }
          )
          .then( resp => {
              if(resp.data !== null){
                this.setState(
                  {
                    invoicesData:resp.data,
                    filteredInvoices:resp.data
                  }
                );
              }
              else{
              alert("no invoices")
              }
            }
            )
            .catch( err => {
                console.log("Login Error", err)
            })




           else if(this.state.userDetails.userType==="RA2")
            list=
            axios.get('http://18.218.231.206/api/ra/invoices', 
              { 
                headers:{"Authorization": `Bearer ${localStorage.token}`},
                params:{
                  invoice_ra_id:this.state.userDetails.userId
                }
              }
              )
              .then( resp => {
                  console.log(resp.data)
                  if(resp.data !== null){
                    this.setState(
                      {
                        invoicesData:resp.data,
                        filteredInvoices:resp.data
                      }
                    );
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

  getFilteredInvoices=(list)=>{
    this.setState({
      filteredInvoices:list
    })
  }

  render() {
    return (    
      <div className="app">
        <NavBar showAvatar={true}/>
        <div className="appContainer-margin"> 
          <div className="invoiceList-container">            
              {this.state.userDetails.userType!=="FINANCE"
              ? <div>
                 <RAInvoiceListHeader userDetails={this.state.userDetails} invoiceList={this.state.invoicesData}  filteredInvoices={this.state.filteredInvoices}/>
                 <RAInvoiceTable userDetails={this.state.userDetails} invoiceList={this.state.invoicesData}  filteredInvoices={this.state.filteredInvoices}/>         
                </div>
              : <FinanceInvoiceListContainer userDetails={this.state.userDetails} invoiceList={this.state.invoicesData}  filteredInvoices={this.state.filteredInvoices}/>
              } 
                  
          </div> 
        </div>
      </div>       
    );
  }
}



export default withRouter(InvoiceListContainer);
