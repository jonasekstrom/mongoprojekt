import React, { Component } from 'react';
import { connect } from "react-redux"
import './showPlayLists.css';
import action from "./actions.js"
import Popup from "./Popup.js"

class ShowPlayLists extends Component {


    callback(genre){
      switch (genre) {
        case "Classical":
          return {background:"rgb(205, 124, 99)"}
        case "Rock":
            return {background:"rgba(27, 23, 23,0.7)"}
        case "Metal":
          return {background:"rgb(198, 60, 60)"}
        case "Country":
          return {background:"rgb(133, 96, 70)"}
        case "Hiphop":
          return {background:"rgb(70, 139, 255)"}
        case "Jazz":
          return {background:"rgb(164, 93, 93)"}
        case "Blues":
          return {background:"rgb(70, 68, 161)"}
        case "Pop":
          return {background:"rgb(102, 173, 81)"}
        case "Electro":
          return {background:"rgb(105, 41, 87)"}

          default:

      }
    }

fontCallback(genre){
  switch (genre) {
    case "Classical":
      return
    case "Rock":
        return {fontFamily: "New Rocker, cursive"}
    case "Metal":
      return {fontFamily: "Metal Mania, cursive"}
    case "Country":
      return {fontFamily:"Italianno, cursive"}
    case "Hiphop":
      return {fontFamily:"Lobster, cursive"}
    case "Jazz":
      return {fontFamily:"Exo 2, sans-serif"}
    case "Blues":
      return {fontFamily: "Wendy One, sans-serif"}
    case "Pop":
      return {fontFamily:"Nixie One, cursive"}
    case "Electro":
      return {fontFamily:"Electrolize, sans-serif"}

      default:

  }}


    render() {
        const listOfPlayList = this.props.playListArray
        const popup = <Popup/>
        let listan = ""
        console.log(listan)

        let render = (
            listOfPlayList.map((list) =>

                <div key={`Key${list.id}`} className="listDiv">
                    <h3 className="clickForPopup"  onClick={e => this.props.dispatch(action.showPopup(list))}>{list.playListName}</h3>
                    <ul>
                        { list.genres.map((option, i) =>{

                            return (<li key={`Key${i}`}>{option}</li>)

                            }
                        )}
                    </ul>
                    <div style={this.callback(list.genres[0])}>

                    </div>

                    {popup}
                </div>
            )
        )
        return (
            <div className="listBackground">
              {render}
              <Popup />
            </div>
        )
    }
};


const mapStateToProps = (state)=>{
    return{
        playListArray : state.playListArray,
        showPopup: state.showPopup
    }
  }

export default connect(mapStateToProps)(ShowPlayLists);
