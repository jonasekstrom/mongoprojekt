import React, { Component } from 'react';
import { connect } from "react-redux"
import './showPlayLists.css';
import action from "./actions.js"
import Popup from "./Popup.js"

class ShowPlayLists extends Component {



    callback(genre){

      // console.log(genre)
      switch (genre) {
        case "classical":
          return {background:"rgb(205, 124, 99)"}
        case "rock":
            return {background:"rgba(27, 23, 23,0.7)"}
        case "metal":
          return {background:"rgb(198, 60, 60)"}
        case "country":
          return {background:"rgb(133, 96, 70)"}
        case "hiphop":
          return {background:"rgb(70, 139, 255)"}
        case "jazz":
          return {background:"rgb(164, 93, 93)"}
        case "blues":
          return {background:"rgb(70, 68, 161)"}
        case "popmusic":
          return {background:"rgb(102, 173, 81)"}
        case "electro":
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

componentDidMount(){


    fetch('http://localhost:5000/playlist', {
      // mode: 'no-cors',
      method: 'GET',
      headers: {
      Accept: 'application/json',
      },
    },
    ).then(response => {
      if (response.ok) {
        response.json().then(json => {
          this.props.dispatch(action.updateList(json))
        });
      }
    });
  // fetch("http://localhost:5000/playlist").then(res => console.log(res))
}

  componentDidUpdate(){
    // console.log("_____________")
    // console.log(this.props.playListArray);
    // console.log(this.props.popup);
    // console.log("_____________")
  }

    render() {
      
        const listOfPlayList = this.props.playListArray

        // console.log(listOfPlayList)
        const popup = <Popup/>

        let listan = ""
        // console.log(listan)

        let render = (
            listOfPlayList.map((list,i) =>

                <div key={`Key${i}`} className="listDiv">
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
        showPopup: state.showPopup,
        userId: state.id,
        popup: state.popup
    }
  }

export default connect(mapStateToProps)(ShowPlayLists);
