import React from 'react';
import './../../App.scss';
import './../../globalCSS/global.scss';
import './login.scss';
import NeoGrowthLogo from './../../assets/NeoGrowth.png';
import { withRouter } from "react-router-dom";
import NavBar from './../navBar/navBar';
import InvoiceListContainer from './../invoiceList/invoiceListContainer';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {createBrowserHistory} from "history";


const axios = require('axios');

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      username:null,
      password:null
    }
  }
  
  loginHandler=()=>{
    axios.post('http://18.218.231.206/api/auth/login', { 
      email:this.state.username,
      password:this.state.password
      }).then( resp => {
      if(resp.data.token !== null){
        localStorage.setItem('token', resp.data.token);
        localStorage.setItem('userDetails', JSON.stringify(resp.data.userDetails));
        this.props.history.push({pathname:"/invoiceList"}); 
      }   
      else{
      alert("invalid password!")
      }
      }).catch( err => {
          console.log("Login Error", err)
      })
  }
  
  onChangeHandler=(e)=>{
    if(e.target.name==="emailId"){
      this.setState({
        username:e.target.value,
      })     
    }
    else if(e.target.name==="password"){
      this.setState({
        password:e.target.value,
      })
    }
  }


  render() {
    return (
      <div className="loginCard-container"> 
         <div className="loginCard">
            <div className="logoImage">
                <img src={NeoGrowthLogo}></img>
            </div>
            <h1 className="loginTitle">
                Login with your Email ID
            </h1>   
            <div className="loginForm">
              <input onChange={this.onChangeHandler} type="email" name="emailId" placeholder="Email ID"/>   
              <input onChange={this.onChangeHandler} type="text" name="password" placeholder="password"/>
              <div className="forgot-password">Forgot Password?</div>
              <button onClick={this.loginHandler} className="loginSubmit-btn">Login</button>
            </div>
         </div>
      </div>
    );
  }
}
export default withRouter(Login);
