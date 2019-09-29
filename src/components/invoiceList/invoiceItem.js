import React from 'react';
import './../../App.scss';
import './../../globalCSS/global.scss';
import './invoiceList.scss';
import { Route, Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import getDueDate from './../../utlities/dateChanger';
import getInvoiceName from './../../utlities/stringChanger';




class InvoiceItem extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      active: false
    }
  }

  handleCheckboxClick=()=>{
    if(this.state.active===true)
       this.setState({
         active:false
       })
    else 
      this.setState({
        active:true
      })
  }
  
  approvalStatus=()=>{
    if(this.props.userDetails.userType==="raSignatory" && this.props.invoiceDetails.invoice_status==="APPROVAL_PENDING")
      return <div className="pending-text">
                <button className="uploaded">Approve</button>
             </div>
    

    else if(this.props.userDetails.userType!=="ra" && this.props.invoiceDetails.invoice_status==="APPROVAL_PENDING")
      return <div className="pending-text">
                Pending
              </div>;
    
    else if(this.props.userDetails.userType==="raSignatory" && this.props.invoiceDetails.reviewStatus==="false")
      return <div className="pending-text">
                 Pending
              </div>;
    
    else return <div className="reviewed">
                    <p className="reviewed-text">Approved</p>
                    <div className="check-circle"><i className="fa fa-check"></i></div> 
               </div>
  }

  reviewStatus=()=>{
    if(this.props.userDetails.userType==="raSignatory" && this.props.invoiceDetails.invoice_status==="APPROVAL_PENDING")
      return <div className="pending-text">
                <button className="uploaded">Approve</button>
             </div>
    
    else if(this.props.userDetails.userType!=="ra" && this.props.invoiceDetails.invoice_status==="APPROVAL_PENDING")
      return <div className="pending-text">
                Pending
              </div>;
    
    else if(this.props.userDetails.userType==="raSignatory" && this.props.invoiceDetails.reviewStatus==="false")
      return <div className="pending-text">
                 Pending
              </div>;
    
    else return <div className="reviewed">
                    <p className="reviewed-text">Approved</p>
                    <div className="check-circle"><i className="fa fa-check"></i></div> 
               </div>
  }

  render() {
    let raName="raname"
    let approvalStatus= this.approvalStatus();
    let reviewStatus= this.reviewStatus();
    const linkStyle={
      textDecoration:"none",
    } 
    return (
      <div className="listWith-checkbox">
      { this.props.userDetails.userType==="finance"
         ?<input type="checkbox" className="financeUpload-checkbox" checked={this.state.active} onClick={this.handleCheckboxClick}/>
         : null 
      }
      <Link style={linkStyle} to={{pathname:"/invoice", state:{invoiceDetails:this.props.invoiceDetails,userDetails:this.props.userDetails}}}>
        <div className="invoiceItem-card">
            <div className="card-item">{getInvoiceName(this.props.invoiceDetails.invoice_name)}</div>
            <div className="card-item">{this.props.invoiceDetails.invoice_date}</div>
            <div className="card-item">{getDueDate(this.props.invoiceDetails.invoice_date)}</div>
            <div className="card-item">{this.props.invoiceDetails.invoice_amount}</div>
            <div className="card-item">
                { this.props.invoiceDetails.invoice_status==="REVIEWED"
                  ? <div className="reviewed">
                      <p className="reviewed-text">Reviewed</p>
                      <div className="check-circle"><i className="fa fa-check"></i></div> 
                    </div>
                  : <div className="pending-text">
                      Pending
                    </div>
                }                         
            </div>
               {raName}
            <div className="card-item">
               {reviewStatus}            
            </div>
            <div className="card-item">
               {approvalStatus}           
            </div>
        </div>
      </Link>
      </div>

    );
  }
}
export default withRouter(InvoiceItem);
