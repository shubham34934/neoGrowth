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
 
  componentWillReceiveProps(nextProps){
    if(nextProps.show!==this.state.show){
      this.setState({
        show:nextProps.show
      })
    }
  }
  render() {
    let modalReject= null; 
    if(this.state.show===true){
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
