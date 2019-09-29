import React from 'react';
import './../../App.scss';
import './../../globalCSS/global.scss';
import './invoiceList.scss';
import InvoiceItem from './invoiceItem';
import DropDown from './../dropDown/dropDown';
import PropTypes from 'prop-types';

class InvoiceTable extends React.Component {
  constructor(props) {
    super(props);   
    this.state={
        active:false
    }
  } 

  checkBoxHandler=()=>{
    
  }

  invoices=()=>{
    let invoices=null;
    if(this.props.filteredInvoices!==null){
        invoices=  this.props.filteredInvoices.map((invoice,index) =>{
        return(
            <InvoiceItem key={index} userDetails={this.props.userDetails} invoiceDetails={invoice}/> 
        );       
       }
      );  
    }   
    return invoices
  }

  render() {  
    let raName= null
    if(this.props.userDetails.userType==="raSignatory"){
       raName= <div className="card-item">{"RA Name"}</div>
    }  
    return (
        <div className="invoiceList-body">
            <div className="invoiceItem-header">
                { this.props.userDetails.userType==="finance"
                ?<input type="checkbox" className="financeUpload-checkbox" checked={this.state.active} onClick={this.checkBoxHandler}/>
                : null 
                }
                <div className="card-item">Invoice Number</div>
                <div className="card-item">
                   <i className="fa fa-calendar" aria-hidden="true"></i>
                   Invoice Date
                </div>
                <div className="card-item">
                   <i className="fa fa-calendar" aria-hidden="true"></i>
                   Due Date
                </div>
                <div className="card-item">Amount</div>
                {raName}
                <div className="card-item">Review Status</div>
                <div className="card-item">Approval Status</div>
            </div>
              {this.invoices()}
        </div>
    );
  }
}

InvoiceTable.propTypes = {
  filteredInvoices: PropTypes.array
}


export default InvoiceTable;
