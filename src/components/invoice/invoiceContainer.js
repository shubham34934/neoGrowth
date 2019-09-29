import React from 'react';
import './../../App.scss';
import './../../globalCSS/global.scss';
import './invoice.scss';
import { Route, Link } from "react-router-dom";
import NavBar from './../navBar/navBar';
import { withRouter } from "react-router-dom";
import {InvoiceSuccessModal,InvoiceRejectionModal, StatusChangeError} from './invoiceModals/invoiceModals';
import InvoiceHeaderContainer from './invoiceHeader/invoiceHeaderContainer';
import InvoiceViewer from './invoiceViewer';
import InvoiceComment from './invoiceComment';
import Modal from './../modals/modal';


const axios= require('axios');

class InvoiceContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      invoiceStatus:this.props.location.state.invoiceDetails.invoice_status,
      apiStatus:""
    }
  }

  changeStatusHandler=(newStatus)=>{
      axios.get('http://18.218.231.206/api/invoices/changeStatus', 
      { 
        headers:{
          "Authorization": `Bearer ${localStorage.token}`,
        },
        params:{
          id:this.props.location.state.invoiceDetails.id,
          invoice_status:newStatus
        }
      }
      )
      .then( resp => {
          if(resp.data !== null){
            this.setState(
              {invoiceStatus:resp.data.invoice_status}
            );
          }
          else{
            this.setState({
              apiStatus:"noData"
            })
          }
        }
      )
      .catch( err => {
        this.setState({
          apiStatus:"loadingFailed"
        })
      })
      console.log(newStatus);
  }

  
  invoiceContentHandler=()=>{
    let invoiceContent=    
        <div className="invoiceList-container">
          <InvoiceHeaderContainer invoiceStatus={this.state.invoiceStatus} changeStatusHandler={this.changeStatusHandler} userType={JSON.parse(localStorage.userDetails).userType}/> 
          <InvoiceViewer pdfUrl={this.props.location.state.invoiceDetails.invoice_url} />
          <InvoiceComment />
        </div>
    if(this.state.apiStatus==="noData") invoiceContent= 
        <div className="Error_fetching"> No Invoice Data Available </div>
    else if(this.state.apiStatus==="loadingFailed") invoiceContent=
        <StatusChangeError/>
    return invoiceContent;
  }

  render() {
    return (
      <div className="app"> 
        <NavBar showAvatar={true}/>
        <div className="appContainer-margin">
          {this.invoiceContentHandler()}
        </div>
      </div>
    );
  }
}
export default withRouter(InvoiceContainer);
