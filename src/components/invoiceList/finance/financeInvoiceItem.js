import React from 'react';
import './../../../App.scss';
import './../../../globalCSS/global.scss';
import './../invoiceList.scss';
import { Route, Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import getDueDate from './../../../utlities/dateChanger';
import getInvoiceName from './../../../utlities/stringChanger';

class FinanceInvoiceItem extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      active: false,
      invoice_status:this.props.invoiceDetails
    }
  }

  onCheck=()=>{
    this.setState(prevState=>({
      active : !prevState.active,
    })    
  )
  }
  approvalStatus=()=>{
    return  <div className="reviewed">
                <p className="reviewed-text">Approved</p>
                <div className="check-circle"><i className="fa fa-check"></i></div> 
            </div>
  }

  reviewStatus=()=>{
             return   <div className="reviewed">
                        <p className="reviewed-text">Approved</p>
                        <div className="check-circle"><i className="fa fa-check"></i></div> 
                      </div>
  }
  checkHandler=()=>{
    if(this.props.allCheck) return true

    else return this.state.active
  }
  render() {
    let raName="raname"
    const linkStyle={
      textDecoration:"none",
    } 
    return (
     <div className="listWith-checkbox">
       {!this.props.selection?null
       :<input type="checkbox" className="financeUpload-checkbox" checked={this.checkHandler()} onClick={this.onCheck} onChange={()=>this.props.onSelect(this.props.invoiceDetails.invoice_id)}/>
       } 
      <Link style={linkStyle} to={{pathname:"/invoice", state:{invoiceDetails:this.props.invoiceDetails}}}>
        <div className="invoiceItem-card">
            <div className="card-item">{getInvoiceName(this.props.invoiceDetails.invoice_name)}</div>
            <div className="card-item">{this.props.invoiceDetails.invoice_date}</div>
            <div className="card-item">{getDueDate(this.props.invoiceDetails.invoice_date)}</div>
            <div className="card-item">{this.props.invoiceDetails.invoice_amount}</div>
            <div className="card-item"> {this.props.invoiceDetails.name} </div>
            <div className="card-item"> {this.props.invoiceDetails.name} </div>
            {this.props.activeFilter==="Uploaded"?
                <i onClick={alert("Can not Download, Work under Progress")}  className="fa fa-download"></i>      
              :null
          }
        </div>
      </Link>
     </div>

    );
  }
}
export default withRouter(FinanceInvoiceItem);
