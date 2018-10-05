import React, { Component } from 'react';

import '../App.css';
import { connect } from "react-redux";
import action from "../actions.js";


class Header extends Component {

  handleClick = () => {
    this.props.dispatch(action.addPost())
  }

  deleteClick = ()=>{

  }

  componentDidUpdate(){
    console.log(this.props.searchInfo.rock)
  }

  render() {
    let rock = this.props.searchInfo.rock;
    let metal = this.props.searchInfo.metal;
    let classical = this.props.searchInfo.classical;
    let country = this.props.searchInfo.country;
    let popMusic = this.props.searchInfo.popMusic;
    let blues = this.props.searchInfo.blues;
    let jazz = this.props.searchInfo.jazz;
    console.log(rock)
    return (
      <div className="App">

          <div className="sidebar">
          </div>
          <div className="header">

            <div className="genres">

              {rock ?
                <span id="rockClicked" onClick={e=> this.props.dispatch(action.rockUnclick(this.props.searchInfo))}>
                  Rock
                </span>
                :
                <span id="rock" onClick={e=> this.props.dispatch(action.rockClicked(this.props.searchInfo))}>
                  Rock
                </span>
              }

              <span id="country">
                Country
              </span>
              <span id="metal">
                Metal
              </span>
              <span id="classical">
                Classical
              </span>
              <span id="pop">
                Pop
              </span>
              <span id="jazz">
                Jazz
              </span>
              <span id="blues">
                Blues
              </span>
              <span id="hiphop">
                HipHop
              </span>
              <span id="electro">
                Electro
              </span>
            </div>
            <div className="inputfield">
              <div className="clip">
              </div>
              <input type="text" />
            </div>


          </div>


      </div>
    );
  }
}

// <ShowPlaylists/>
// <Popup/>
//
//   {this.props.post}
//
//   <button onClick={e => this.props.dispatch(action.addPost())}>Click</button>
//   <button onClick={ e=> this.props.dispatch(action.deletePost())}>Delete</button>

const mapStateToProps = (state)=>{
  return{
    searchInfo : state.searchInfo
  }
}

export default connect(mapStateToProps)(Header);
