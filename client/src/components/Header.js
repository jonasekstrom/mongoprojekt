import React, { Component } from 'react';

import '../App.css';
import { connect } from "react-redux";
import action from "../actions.js";
import Genres from "./Genres.js"
import CreateList from "./CreateList.js"


class Header extends Component {

  constructor(){
    super();
    this.state ={
      createList:"Create list",
      clicked:false,
      clickedCreateList:{
        opacity:0,
        height:0,
        zIndex:-1

      }
    }
  }

  createListClick(){
    if(this.state.clicked){
      console.log("hej")
      this.setState({
        createList:"Create list",
        clicked:false,
        clickedCreateList:{
          opacity:0,
          height:"0px",
          zIndex:-1
        }
      })
    }else{
      this.setState({
        createList:"Return",
        clicked:true,
        clickedCreateList:{
          opacity:1,
          height:"470px",
          zIndex:1

        }
      })

    }
  }
  changeInp(e){
    this.props.dispatch(action.searchField(e.target.value))
  }

  handleKeyPress(e){
    if(e.key === "Enter"){
      let genreObj = this.props.searchInfo;
      let searchField = this.props.searchField;

      let genreArray =[]


      for(let element in genreObj){
        if(genreObj[element]){
          genreArray.push(element)
        }
      }


      console.log(genreArray)
      console.log(searchField)
      fetch(`$localhost:5000/search?searchText=${searchField}`)
      //Skickas en fetch med get till servern med en querystring med ovantstående värden.

    }
  }

  componentDidUpdate(){
    console.log(this.state.clickedCreateList)

  }
  render() {

    return (

      <React.Fragment>
          <div className="sidebarHeader">
            <span id="createList" onClick={e => this.createListClick()}>{this.state.createList}</span>
            <div style={this.state.clickedCreateList} className="styleTransition">
              <CreateList/>
            </div>
            <span id="username">{this.props.userName}</span>
          </div>
          <div className="header">

            <img className="userImg" src={this.props.userImg}/>
            <Genres/>
            <div className="inputfield">
              <div className="clip">
              </div>
              <input type="text" value={this.props.searchField} onChange={e=> this.changeInp(e)} onKeyPress={e => this.handleKeyPress(e)}/>
            </div>


          </div>
      </React.Fragment>

    );
  }
}

const mapStateToProps = (state)=>{
  return{
    userName: state.userName,
    searchField: state.searchField,
    searchInfo: state.searchInfo,
    userImg:state.userImg
  }
}

export default connect(mapStateToProps)(Header);
