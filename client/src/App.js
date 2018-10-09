import React, { Component } from 'react';
import ShowPlaylists from './showPlayLists.js';
import Header from "./components/Header.js"
import './App.css';
import { connect } from "react-redux";
import action from "./actions.js";


class App extends Component {

  render() {
    return (
      <div className="App">

        <Header/>
        <ShowPlaylists/>

      </div>
    );
  }
}


// <div className="sidebar">
//   <button>Login</button>
//   <button>Create user</button>
// </div>
// <div className="backgroundImage">
//
//
//
// </div>
// <div className="sidebar">
// </div>

// <ShowPlaylists/>
// <Popup/>
//
//   {this.props.post}
//
//   <button onClick={e => this.props.dispatch(action.addPost())}>Click</button>
//   <button onClick={ e=> this.props.dispatch(action.deletePost())}>Delete</button>

const mapStateToProps = (state)=>{
  return{
    post : state.post
  }
}

export default connect(mapStateToProps)(App);
