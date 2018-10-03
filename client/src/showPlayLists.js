import React, { Component } from 'react';
import './showPlayLists.css';

class ShowPlayLists extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playListArray: [{
                name: "Min lista",
                genres: ["Blues", "Rock", "Classical"]
            },
            {
                name: "Min lista 2",
                genres: ["Rock", "Classical"]
            },
            {
                name: "Min lista 3",
                genres: ["Classical"]
            },
        ]
            
    }
}

    clickThePlayList = (e) => {
        console.log("testclick")
        window.open("https://www.spotify.com/se/")
    }




render(){
    
    const listOfPlayList = this.state.playListArray 
    console.log(listOfPlayList)
    const renderList = listOfPlayList.map((list) => 

        <ul>
        <li key={list.name}
            className="playListDiv"
            onClick={ this.clickThePlayList }
        >
            <h3>Name: {list.name}</h3>
            <h4>Genres: {list.genres} </h4>
           
        </li>
        
        </ul>)

    return(
        <div className="showPlayListsDiv">
            <div className="playListUL">
                {renderList}
            </div>
        </div>
    ) 
  }
  

};
    
  
  export default ShowPlayLists;



























