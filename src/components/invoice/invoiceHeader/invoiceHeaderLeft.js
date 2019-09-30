import React from 'react';
import './../../../App.scss';
import './../../../globalCSS/global.scss';
import './invoiceHeader.scss';
import Success from './../../uiComponents/success';
import Pending from './../../uiComponents/pending';
import Button from './../../uiComponents/button';
import Failure from './../../uiComponents/failure';
import {InvoiceSuccessModal,InvoiceRejectionModal, StatusChangeError} from './../invoiceModals/invoiceModals';


class InvoiceHeaderLeft extends React.Component {
  constructor(props) {
    super(props);   
    this.state={
       invoiceStatus:this.props.invoiceStatus,
       status:"",
    }
  } 

  handleClick=(newStatus)=>{
    this.props.changeStatusHandler(newStatus);
    this.setState({
      status:newStatus
    })
  }

  statusContent=()=>{
    let statusContent= null;
    if(this.props.userType==="RA" && this.props.invoiceStatus==="REVIEW_PENDING") 
      statusContent=   <div>
                         <button onClick={()=>this.handleClick("REJECTED")} className="reject-btn">Reject</button>
                         <button onClick={()=>this.handleClick("APPROVAL_PENDING")}  className="review-btn">Mark as Reviewed</button>
                       </div>

    else if(this.props.userType==="RA" && this.props.invoiceStatus==="APPROVAL_PENDING") 
    statusContent=  <div onClick={()=>this.handleClick("REVIEW_PENDING")} className="buttons">
                      <Success> Reviewed </Success>
                      <Pending >Approval Pending</Pending>
                    </div>
    
    else if(this.props.userType==="RA" && this.props.invoiceStatus==="APPROVED") 
    statusContent=  <div className="buttons">
                      <Success> Reviewed </Success>
                      <Success>Approved</Success>
                    </div>

    else if(this.props.userType==="FINANCE" && this.props.invoiceStatus==="APPROVED") 
    statusContent=  <div className="buttons">
                      <Success> Approved</Success>
                      <Button onClick={()=>this.handleClick("UPLOADED")} btnStyle="upload">Upload</Button>
                    </div>

    else if(this.props.userType==="FINANCE" && this.props.invoiceStatus==="UPLOADED") 
    statusContent=  <div className="buttons">
                       <Success>Uploaded</Success>
                       <div className="check-circle"><i className="fa fa-download"></i></div>
                       <p className="reviewed-text">Download Bank File</p>       
                    </div>

              
    else if(this.props.userType==="RA_SIGNATORY" && this.props.invoiceStatus==="APPROVAL_PENDING") 
    statusContent=  <div className="buttons">
                      <Success> Reviewed </Success>
                      <Button onClick={()=>this.handleClick("APPROVED")} btnStyle="approve" >Approve</Button>
                    </div>
    
    else if(this.props.userType==="RA_SIGNATORY" && this.props.invoiceStatus==="REVIEW_PENDING") 
    statusContent=  <div className="buttons">
                     <Pending>Review Pending</Pending>
                    </div>
    
    
    else if (this.props.userType==="RA_SIGNATORY" && this.props.invoiceStatus==="APPROVED") 
    statusContent=  <div className="buttons">
                     <Success> Approved </Success>
                    </div>

    return statusContent

}

  render() {  
    let modalContent=null
    if(this.state.status==="REJECTED")
     modalContent= <InvoiceRejectionModal show={true}></InvoiceRejectionModal>
    else if(this.state.status==="approved") 
    modalContent= <InvoiceSuccessModal show={true}>You have successfully approved the invoice.</InvoiceSuccessModal>
    else if(this.state.status==="reviewed")  
    modalContent= <InvoiceSuccessModal show={true}>You have successfully reviewed the invoice.</InvoiceSuccessModal>

    return (
      <div >
          {this.state.status==="REJECTED"
          ? <Failure>Rejected</Failure>
          : this.statusContent()}
          {modalContent}
      </div>
    );
  }
}

export default InvoiceHeaderLeft;