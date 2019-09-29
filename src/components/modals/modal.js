import React from 'react';
import './../../App.scss';
import './../../globalCSS/global.scss';
import './modals.scss';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state={
        show:this.props.show
    }
  }
 
  render() {
    let modalReject= null; 
    if(this.props.show==="true"){
        modalReject= <div className="modal-container">
              <div className="modal">
                   {this.props.children}
                   </div>         
              </div>
    }
    return (
      <div>
        {modalReject}
      </div>
    );
  }
}
export default Modal;
