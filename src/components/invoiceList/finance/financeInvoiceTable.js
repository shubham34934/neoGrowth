import React from 'react';
import './../../../App.scss';
import './../../../globalCSS/global.scss';
import './../invoiceList.scss';
import FinanceInvoiceItem from './financeInvoiceItem';
import DropDown from './../../dropDown/dropDown';
import PropTypes from 'prop-types';

class FinanceInvoiceTable extends React.Component {
  constructor(props) {
    super(props);   
    this.state={
        active:false,
        allCheck:false
    }
  } 

  checkBoxHandler=()=>{
    console.log("")
  }

  invoices=()=>{
    let invoices=null;
    if(this.props.filteredInvoices!==null){
        invoices=  this.props.filteredInvoices.map((invoice,index) =>{
        return(
            <FinanceInvoiceItem onSelect={this.props.onSelect} allCheck={this.state.allCheck} activeFilter={this.state.activeFilter} selection={this.props.selection} key={index} userDetails={this.props.userDetails} invoiceDetails={invoice}/> 
        );       
       }
      );  
    }   
    return invoices
  }
  onCheck=()=>{
      this.setState(prevState=>({
        active : !prevState.active,
        allCheck : !prevState.allCheck
      })    
    )
  }
  render() {  
     
    return (
        <div className="invoiceList-body">
            <div className="invoiceItem-header">
                {!this.props.selection?null
                 : <input type="checkbox" className="financeUpload-checkbox" onClick={this.onCheck} checked={this.state.active} onChange={()=>this.props.onSelect("all")}/>
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
                <div className="card-item">Company Name</div>
                <div className="card-item">RA Name</div>

            </div>
              {this.invoices()}
        </div>
    );
  }
}

FinanceInvoiceTable.propTypes = {
  filteredInvoices: PropTypes.array
}


export default FinanceInvoiceTable;
