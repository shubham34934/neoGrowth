import React from 'react';
import './../../App.scss';
import './../../globalCSS/global.scss';
import './navBar.scss';
import NeoGrowthLogo from './../../assets/NeoGrowth.png';
import { Route, Link } from "react-router-dom";
import DropDown from '../dropDown/dropDown';
import { withRouter } from "react-router-dom";


class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      showAvatarMenu:false,
      userDetails:""
    }
  }
  
  componentDidMount(){
     if(localStorage.length!==0){
       this.setState({
          userDetails : JSON.parse(localStorage.userDetails)
       })
     }
  }

  logout=()=>{
    localStorage.clear();
    this.props.history.push("/"); 
  }
  avatarMenuHandler=(menuItem)=>{
    if(menuItem==="Logout")
      this.logout();
    else if(menuItem==="Profile")
      this.props.history.push("/invoice");
    this.setState({
      showAvatarMenu: !this.state.showAvatarMenu
    })
  }

  render() {
    let navBarAvatar=null;
    const avatarMenuItems=["Profile","Logout"];
    if(this.props.showAvatar===true){
      navBarAvatar=   
        <div className="navBar-avatar">
          <span className="username">{this.state.userDetails.username}</span>
          <img onClick={this.avatarMenuHandler} src="https://i0.wp.com/zblogged.com/wp-content/uploads/2019/02/FakeDP.jpeg?resize=567%2C580&ssl=1" className="avatar"/>
          <i onClick={this.avatarMenuHandler}  className="fa fa-ellipsis-v"></i>
          <DropDown show={this.state.showAvatarMenu} top={"50px"} left={"-75px"} width={"200px"}>
            <ul>
              {avatarMenuItems.map(menuItem=><li key={menuItem} onClick={()=>this.avatarMenuHandler(menuItem)}>{menuItem}</li>)}
            </ul>  
          </DropDown>
        </div>
    }    
    return (
      <div className="navBar-container">
        <div className="navContainer-margin">
          <div className="navBar-content">
            {localStorage.length===0
            ?<Link to = "/" >
              <div className="navBar-logo">
                <img src={NeoGrowthLogo}/>
              </div>  
            </Link>
            :<Link to = "/invoiceList" >
              <div className="navBar-logo">
                <img src={NeoGrowthLogo}/>
              </div>  
            </Link>
            }
            {navBarAvatar}
          </div>
        </div>
        
      </div>
    );
  }
}
export default withRouter(NavBar);
