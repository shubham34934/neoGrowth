import React from 'react';
import './../../../App.scss';
import './../../../globalCSS/global.scss';
import './invoiceHeader.scss';
import Success from './../../uiComponents/success';
import Pending from './../../uiComponents/pending';
import Button from './../../uiComponents/button';
import Failure from './../../uiComponents/failure';


class InvoiceHeaderLeft extends React.Component {
  constructor(props) {
    super(props);   
    this.state={
       status:""
    }
  } 
  handleClick=(newStatus)=>{
    if(newStatus==="REJECTED")
      this.setState({
        status:newStatus
      })
    else 
     this.props.changeStatusHandler(newStatus);
  }

  statusContent=()=>{
    let statusContent= null;
    if(this.props.userType==="RA" && this.props.invoiceStatus==="REVIEW_PENDING") 
      statusContent=   <div>
                         <button onClick={()=>this.handleClick("REJECTED")} className="reject-btn">Reject</button>
                         <button  className="review-btn">Mark as Reviewed</button>
                       </div>

    else if(this.props.userType==="RA" && this.props.invoiceStatus==="REVIEWED") 
    statusContent=  <div className="buttons">
                      <Success> Reviewed </Success>
                      <Pending>Approval Pending</Pending>
                    </div>
    
    else if(this.props.userType==="RA" && this.props.invoiceStatus==="APPROVED") 
    statusContent=  <div className="buttons">
                      <Success> Reviewed </Success>
                      <Success>Approval Pending</Success>
                    </div>

    else if(this.props.userType==="FINANCE" && this.props.invoiceStatus==="APPROVED") 
    statusContent=  <div className="buttons">
                      <Success> Approved</Success>
                      <Button btnStyle="upload" >Upload</Button>
                    </div>


    else if(this.props.userType==="FINANCE" && this.props.invoiceStatus==="UPLOADED") 
    statusContent=  <div className="buttons">
                       <Success>Uploaded</Success>
                       <div className="check-circle"><i className="fa fa-download"></i></div>
                       <p className="reviewed-text">Download Bank File</p>       
                    </div>

              
    else if(this.props.userType==="RA_SIGNATORY" && this.props.invoiceStatus==="REVIEWED") 
    statusContent=  <div className="buttons">
              <Success> Reviewed </Success>
              <Button btnStyle="approve" >Approve</Button>
            </div>
    
    else if(this.props.userType==="RA_SIGNATORY" && this.props.invoiceStatus==="REVIEW PENDING") 
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
    return (
      <div >
          {this.state.status==="REJECTED"
          ? <Failure>Rejected</Failure>
          : this.statusContent()}
      </div>
    );
  }
}

export default InvoiceHeaderLeft;