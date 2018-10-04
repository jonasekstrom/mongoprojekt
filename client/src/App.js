import React, { Component } from 'react';
import ShowPlaylists from './showPlayLists.js';

import './App.css';
import Popup from "./Popup.js";

import { connect } from "react-redux"
import action from "./actions.js"


class App extends Component {

  handleClick = () => {
    this.props.dispatch(action.addPost())
  }

  deleteClick = ()=>{

  }
  render() {
    return (
      <div className="App">
      <ShowPlaylists/>
      


      <Popup/>

        {this.props.post}

        <button onClick={e => this.props.dispatch(action.addPost())}>Click</button>
        <button onClick={ e=> this.props.dispatch(action.deletePost())}>Delete</button>



      </div>
    );
  }
}

const mapStateToProps = (state)=>{
  return{
    post : state.post
  }
}
//
// const mapDispatchToProps = (dispatch) =>{
//
//   return {
//     add: ()=> {  dispatch(action.addPost())},
//     deleteCode: ()=> {dispatch(action.deletePost())}
//   }
//
//
// }

export default connect(mapStateToProps)(App);
