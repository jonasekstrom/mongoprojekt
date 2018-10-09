import React, { Component } from 'react';
import { connect } from "react-redux"
import './showPlayLists.css';
import action from "./actions.js"
import Popup from "./Popup.js"

class ShowPlayLists extends Component {
    
    render() {
        const listOfPlayList = this.props.playListArray
        // console.log(listOfPlayList)
        const popup = <Popup/>
        
        let render = (
            listOfPlayList.map((list) =>

                <div key={`Key${list.id}`}>
                    <h3 className="clickForPopup" onClick={e => this.props.dispatch(action.showPopup(list))}>{list.playListName}</h3>
                    <ul>
                        {list.genres.map((option, i) =>
                            <li key={`Key${i}`}>{option}</li>
                        )}
                    </ul>
                    {popup}
                </div>
            )
        )
        return (
            <div>
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
        userId: state.id
    }
  }

export default connect(mapStateToProps)(ShowPlayLists);
