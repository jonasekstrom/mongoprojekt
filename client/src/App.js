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
<<<<<<< HEAD
<<<<<<< HEAD
      
        <ShowPlaylists/>
      
=======
=======

>>>>>>> 54d328f95d9055792066ae0f7222ceda5d87ee68

      <Popup/>

        {this.props.post}

        <button onClick={this.handleClick}>Click</button>
        <button onClick={this.deleteClick}>Delete</button>

<<<<<<< HEAD
>>>>>>> 9d270b65aae5ae320e00acdceb55a243e6f6214a
=======

>>>>>>> 54d328f95d9055792066ae0f7222ceda5d87ee68
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
