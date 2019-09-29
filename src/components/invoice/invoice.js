import React from 'react';
import './../../App.scss';
import './../../globalCSS/global.scss';
import './invoice.scss';
import { Route, Link } from "react-router-dom";
import Modal from './../modals/modal';
import NavBar from './../navBar/navBar';
import { withRouter } from "react-router-dom";
const axios= require('axios');
class Invoice extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      rejectModal:"false",
      approvedModal:"false",
      comment:"",
      commentSection:"",
    }
  }

  rejectBtnHandler= () => {
    if(this.state.rejectModal==="false"){
      this.setState({
        rejectModal:"true"
      })
    }  
    else{
      this.setState({
        rejectModal:"false"
      })
    }
  }

  changeStatusHandler=()=>{
    console.log(this.props.location.state.invoiceDetails);
      axios.get('http://18.218.231.206/api/invoices/changeStatus', 
      { 
        headers:{"Authorization": `Bearer ${localStorage.token}`},
        params:{
          id:this.props.location.state.invoiceDetails.id,
          invoice_status:"APPROVAL_PENDING"
        }
      }
      )
      .then( resp => {
          console.log(resp);
          if(resp.data !== null){
            this.setState(
              {
                invoicesData:resp.data
              }
            )
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
  
  markReviewHandler= () => {
    this.changeStatusHandler();
    if(this.state.approvedModal==="false"){
      this.setState({
        approvedModal:"true"
      })
    }  
    else{
      this.setState({
        approvedModal:"false"
      })
    }
  }
  
  showCommentSection=()=>{
    const commentSection=
      <div className="comment-container">
        <div className="rejected-text"><span className="rejected">Rejected</span> on 26-09-19</div>
        <div className="comment">{this.state.comment}</div>
      </div>
    if(this.state.rejectModal==="false"){
      this.setState({
        rejectModal:"true",
        commentSection:commentSection
      })
    }  
    else{
      this.setState({
        rejectModal:"false",
        commentSection:commentSection
      })
    }
  }

  commentHandler=(e)=>{
    this.setState({
      comment:e.target.value
    })
  }

  render() {
    console.log(this.props.location.state.invoiceDetails);
    return (
      <div className="app"> 
        <NavBar showAvatar={true} userDetails={this.props.location.state.userDetails}/>
        <div className="appContainer-margin">
            <div className="invoiceList-container">
              <div className="invoiceList-header">
                <div className="back">
                  <Link to="./invoiceList">
                    <i className="fa fa-arrow-left"></i>
                  </Link>
                  <h1 className="invoice-title">
                    {this.props.approved}
                    Invoice List  
                  </h1>
                </div>
                <Modal show={this.state.rejectModal}>
                  <div className="rejectionReason">
                    Reason for Rejection
                  </div>
                  <input onChange={this.commentHandler.bind(this)} type="text" className="rejectComment"></input>
                  <button onClick={this.showCommentSection} className="review-btn">Close</button>
                </Modal>
                <Modal show={this.state.approvedModal} >
                  <div className="invoiceReviewed">
                        <div className="successStatus">
                          <div className="check-circle"><i className="fa fa-check"></i></div>
                          <p className="invoiceReviewed-text">You have reviewed invoice successfully</p> 
                        </div>
                        <button onClick={this.approvedBtnHandler} className="review-btn">Close</button>
                  </div>                
                </Modal>
                <div className="buttons">
                  <button onClick={this.rejectHandler} className="reject-btn">Reject</button>
                  <button onClick={this.markReviewHandler}  className="review-btn">Mark as Reviewed</button>
                </div>
              </div> 
              <div className="invoiceList-body">
                <div className="pdf-viewer">
                    <iframe src={this.props.location.state.invoiceDetails.invoice_url} height="600" width="90%"></iframe>
                </div>
                {this.state.commentSection}
              </div>  
            </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Invoice);
