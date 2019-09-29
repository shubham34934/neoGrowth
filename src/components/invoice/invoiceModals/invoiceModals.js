import React from 'react';
import './../../../App.scss';
import './../../../globalCSS/global.scss';
import './invoiceModals.scss';
import Modal from '../../modals/modal';

class InvoiceRejectionModal extends React.Component {
  constructor(props) {
    super(props);   
    this.state={
        show:false
    }
  } 
  render() {  
    return (
        <div className="">
            <Modal show={this.state.rejectModal}>
              <div className="rejectionReason">
                Reason for Rejection
              </div>
              <input type="text" className="rejectComment"></input>
              <button className="review-btn">Close</button>
            </Modal>
        </div>
    );
  }
}

class InvoiceSuccessModal extends React.Component {
    constructor(props) {
      super(props);   
      this.state={
          show:this.props.show
      }
    } 

    componentWillReceiveProps(nextProps){
      if(nextProps.show!==this.state.show){
        this.setState({
          show:nextProps.show
        })
      }
    }

    closeModal=()=>{
      this.setState({
        show: !this.state.show
      })
    }
    
    render() {  
       let content = null
       if(this.state.show) content=
                                 <Modal show={true}>
                                  <div className="invoiceReviewed">
                                        <div className="successStatus">
                                          <div className="check-circle"><i className="fa fa-check"></i></div>
                                          <p className="invoiceReviewed-text">You have reviewed invoice successfully</p> 
                                        </div>
                                        <button onClick={this.closeModal} className="review-btn">Close</button>
                                  </div>                
                                </Modal>
                          
      return (
        <div>
          {content}
        </div>
      );
    }
  }

  class StatusChangeError extends React.Component {
    constructor(props) {
      super(props);   
      this.state={
          show:this.props.show
      }
    } 

    render() {  
      return (
        <Modal>
          <div className="invoiceReviewed">
                  <p className="invoiceReviewed-text">Status change failed! Something went wrong, Please try again</p> 
                <button className="review-btn">Close</button>
          </div>                
        </Modal>
      );
    }
  }

export {
  InvoiceRejectionModal,
  InvoiceSuccessModal,
  StatusChangeError
}