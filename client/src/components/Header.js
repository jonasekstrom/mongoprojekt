import React, { Component } from 'react';

import '../App.css';
import { connect } from "react-redux";
import action from "../actions.js";
import Genres from "./Genres.js"

class Header extends Component {


  changeInp(e){
    this.props.dispatch(action.searchField(e.target.value))
  }

  handleKeyPress(e){
    if(e.key === "Enter"){
      let genreObj = this.props.searchInfo;
      let searchField = this.props.searchField;

      //Skickas en fetch med get till servern med en querystring med ovantstående värden.
      
    }
  }
  render() {


    return (
      <div className="App">

          <div className="sidebarHeader">
            <span id="username">{this.props.userName}</span>
          </div>
          <div className="header">

            <Genres/>
            <div className="inputfield">
              <div className="clip">
              </div>
              <input type="text" value={this.props.searchField} onChange={e=> this.changeInp(e)} onKeyPress={e => this.handleKeyPress(e)}/>
            </div>


          </div>


      </div>
    );
  }
}

const mapStateToProps = (state)=>{
  return{
    userName: state.userName,
    searchField: state.searchField,
    searchInfo: state.searchInfo
  }
}

export default connect(mapStateToProps)(Header);
