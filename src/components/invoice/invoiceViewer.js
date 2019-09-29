import React from 'react';
import './../../App.scss';
import './../../globalCSS/global.scss';
import './invoice.scss';

class InvoiceViewer extends React.Component {
  constructor(props) {
    super(props);   
    this.state={
    }
  } 
  render() {  
    return (
      <div className="invoiceList-body">
        <div className="pdf-viewer">
            <iframe src={this.props.pdfUrl} height="600" width="90%"></iframe>
        </div>
      </div>  
    );
  }
}

export default InvoiceViewer;