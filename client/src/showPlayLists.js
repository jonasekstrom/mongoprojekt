import React, { Component } from 'react';
import { connect } from "react-redux"
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

    



    let render = (

    listOfPlayList.map((list, index) =>

    <div key={`Key${index}`}>

      <h3>{list.name}</h3>

      <ul>

        {list.genres.map((option, i) => 

          <li key={`Key${i}`}>{option}</li>

        )}

      </ul>

    </div>

  )

  )



    return(

        <div>{render}</div>

    )

  }

  

};

    

  

  export default ShowPlayLists;