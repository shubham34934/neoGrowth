import React from 'react';
import './App.scss';
import './globalCSS/global.scss';
import Login from './components/login/login';
import NavBar from './components/navBar/navBar';
import InvoiceListContainer from './components/invoiceList/invoiceListContainer';
import InvoiceContainer from './components/invoice/invoiceContainer';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {createBrowserHistory} from "history";


const history=createBrowserHistory();

function App() {
    
  const redirectRoute = localStorage.token? "invoiceList":null ;
  return (
  <Router history={history}>
    <div className="app">
      <Switch>
        
        <Route exact path="/" render={()=>
          <div>
           <NavBar/>
           <Login/>
          </div>}
        />
        <Route path="/invoiceList" render={()=>
          <div>
            <InvoiceListContainer/>
          </div>}
        />   
        <Route exact path="/invoice" render={()=>
          <div>
            <InvoiceContainer/>
          </div>}
        /> 
      </Switch>
  
    </div>
  </Router>
  );
}

export default App;