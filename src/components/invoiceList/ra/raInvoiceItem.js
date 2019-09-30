import React from 'react';
import './../../../App.scss';
import './../../../globalCSS/global.scss';
import './../invoiceList.scss';
import { Route, Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import getDueDate from './../../../utlities/dateChanger';
import getInvoiceName from './../../../utlities/stringChanger';
import Success from './../../uiComponents/success';
import Pending from './../../uiComponents/pending';


class RAInvoiceItem extends React.Component {
  constructor(props) {
    super(props);
  }

  approvalStatus=()=>{
    if(this.props.userDetails.userType==="RA_SIGNATORY" && this.props.invoiceDetails.invoice_status==="APPROVAL_PENDING")
      return  <button onClick={()=>this.handleClick("APPROVAL_PENDING")}  className="review-btn">Approve</button>

    else if(this.props.userDetails.userType==="RA" && this.props.invoiceDetails.invoice_status==="REVIEW_PENDING")
      return <Pending>Pending</Pending>
    
    else if(this.props.userDetails.userType==="RA_SIGNATORY" && this.props.invoiceDetails.invoice_status==="REVIEW_PENDING")
      return <Pending>Pending</Pending>
    
    else return <Success>Approved</Success>
  }

  reviewStatus=()=>{
  
    if(this.props.userDetails.userType==="RA" && this.props.invoiceDetails.invoice_status==="REVIEW_PENDING")
      return <Pending>Pending</Pending>
    
    else if(this.props.userDetails.userType==="RA_SIGNATORY" && this.props.invoiceDetails.invoice_status==="REVIEW_PENDING")
      return <Pending>Pending</Pending>
    
    else return <Success>Approved</Success>
  }


  render() {
    const linkStyle={
      textDecoration:"none",
    } 
    console.log(this.props.invoiceDetails.name)
    return (    
      <Link style={linkStyle} to={{pathname:"/invoice", state:{invoiceDetails:this.props.invoiceDetails}}}>
        <div className="invoiceItem-card">
            <div className="card-item">{getInvoiceName(this.props.invoiceDetails.invoice_name)}</div>
            <div className="card-item">{this.props.invoiceDetails.invoice_date}</div>
            <div className="card-item">{getDueDate(this.props.invoiceDetails.invoice_date)}</div>
            <div className="card-item">{this.props.invoiceDetails.invoice_amount}</div>
            {this.props.userDetails.userType==="RA_SIGNATORY" ? <div className="card-item">{this.props.invoiceDetails.name}</div>
            :null}
            <div className="card-item">
               {this.reviewStatus()}            
            </div>
            <div className="card-item">
               {this.approvalStatus()}           
            </div>
        </div>
      </Link>
    );
  }
}
export default withRouter(RAInvoiceItem);
