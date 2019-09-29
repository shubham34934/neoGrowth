import React from 'react';
import './../../App.scss';
import './../../globalCSS/global.scss';
import './invoice.scss';

class InvoiceComment extends React.Component {
  constructor(props) {
    super(props);   
    this.state={
    }
  } 
  render() {  
    return (
      <div className="comment-container">
        <div className="rejected-text"><span className="rejected">Rejected</span> on 26-09-19</div>
        <div className="comment"></div>
      </div> 
    );
  }
}

export default InvoiceComment;