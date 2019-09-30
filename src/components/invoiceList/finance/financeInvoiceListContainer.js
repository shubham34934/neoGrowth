import React from 'react';
import './../../../App.scss';
import './../../../globalCSS/global.scss';
import './../invoiceList.scss';
import DropDown from './../../dropDown/dropDown';
import { Route, Link } from "react-router-dom";
import NavBar from '../../navBar/navBar';
import { withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import './finance.scss';
import FinanceInvoiceListHeader from './financeInvoiceListHeader';
import FinanceInvoiceListTable from './financeInvoiceTable';
import { updateExpression } from '@babel/types';


const axios = require('axios');



class FinanceInvoiceListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state={
        activeFilter: "Pending",
        uploadActive:false,
        filteredInvoices:[],
        selection: true,
        selectedInvoices:[]
    }
  } 

    componentWillReceiveProps(nextProps){
        if(nextProps.filteredInvoices!==null){
            this.setState({
                filteredInvoices:nextProps.filteredInvoices
            })
        }
    }

    changeStatus=(newStatus,id)=>{
        axios.get('http://18.218.231.206/api/invoices/changeStatus', 
        { 
          headers:{
            "Authorization": `Bearer ${localStorage.token}`,
          },
          params:{
            id:id,
            invoice_status:newStatus
          }
        }
        )
        .then( resp => {
            if(resp.data !== null){
              this.setState(
                {filteredInvoices:this.props.filteredInvoices}
              );
            }
            else{
             console.log("not changed")
            }
          }
        )
        .catch( err => {
          console.log("Something Went Wrong, Try again")
        })
   }
    
    onFilterClick=(filter)=>{
      let filteredList=this.props.filteredInvoices
        if(filter==="Uploaded"){
            filteredList= this.props.filteredInvoices.filter((invoice) =>
            invoice.invoice_status === "UPLOADED")
            this.setState({
                selection:false
            })
        }

        if(filter==="Pending")
            filteredList= this.props.filteredInvoices.filter((invoice) =>
            invoice.invoice_status === "APPROVED")

        this.setState({
            filteredInvoices:filteredList
        })
    }
    
    onSelect=(id)=>{
       let selectedArray=this.state.filteredInvoices;
        if(id!=="all")
         selectedArray.push(this.state.filteredInvoices.filter((invoice)=>invoice.invoice_id===id))
        console.log(selectedArray);
    }

  render() {   
    return (    
        <div className="invoiceList-container">    
            <FinanceInvoiceListHeader changeStatus={this.changeStatus} onFilterClick={this.onFilterClick} userDetails={this.props.userDetails} invoiceList={this.props.invoiceList}  filteredInvoices={this.state.filteredInvoices}/>
            <FinanceInvoiceListTable activeFilter={this.state.activeFilter} selection={this.state.selection} onSelect={this.onSelect} userDetails={this.props.userDetails} invoiceList={this.props.invoiceList}  filteredInvoices={this.state.filteredInvoices}/>
        </div>
    );
  }
}

export default withRouter(FinanceInvoiceListContainer);
