import React, { Component } from 'react';
import ShowPlaylists from './showPlayLists.js';

import './App.css';
import Popup from "./Popup.js";

import { connect } from "react-redux"
import action from "./actions.js"


class App extends Component {

  handleClick = () => {
    this.props.add()
  }

  deleteClick = ()=>{
    this.props.deleteCode()

  }
  render() {
    return (
      <div className="App">


      <Popup/>

        {this.props.post}

        <button onClick={this.handleClick}>Click</button>
        <button onClick={this.deleteClick}>Delete</button>


      </div>
    );
  }
}

const mapStateToProps = (state)=>{
  return{
    post : state.post
  }
}

const mapDispatchToProps = (dispatch) =>{

  return {
    add: ()=> {  dispatch(action.addPost())},
    deleteCode: ()=> {dispatch(action.deletePost())}
  }


}

export default connect(mapStateToProps,mapDispatchToProps)(App);
