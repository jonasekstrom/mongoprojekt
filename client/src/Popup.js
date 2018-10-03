import React, { Component } from 'react';
import './Popup.css';

class Popup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ownerOfPlayList: false,
      showPopup: true,
      playListName: "Working out like Hackerman",
      userName: "Hackerman",
      genres: ["Electro", "Jazz", "Blues"],
      description: "This is what I use when I want to get PUMPED lifting computers at the gym",
      spotify: "https://open.spotify.com/user/smeknoob/playlist/3x4mBCp6ICZOBRfBmEXoS9?si=7M9X9NDWT3iK1fHfsZ0sBQ",
    }
  }

  componentDidMount() { }

  render() {
    let allowedToEdit = this.state.ownerOfPlayList;
    let listGenres = this.state.genres;

    if (allowedToEdit) {
      return (
        <div className="popup">
          <div className={"popup_inner"}>
            <div className="informationPlayList">
              <input className="playListTitleEdit" value={this.state.playListName} /> <br />
              <h3 className="playListInformation">Genres:</h3>

              <ul>{listGenres.map(function (genre, index) {
                return <li key="index"><input value={genre} /></li>
              })}</ul>

              <h3 className="playListInformation">Playlist name:</h3>
              <input className="editInformation" value={this.state.playListName} /> <br />
              <h3 className="playListInformation">Created by:</h3>
              <input className="editInformation" value={this.state.userName} /> <br />
              <h3 className="playListInformation">Description:</h3>
              <input className="editInformation" value={this.state.description} /> <br />
              <h3 className="playListInformation">Spotify link:</h3>
              <input className="editInformation" value={this.state.spotify} />
            </div>
            <br />

          </div>
          <button className="closeBtn">Close</button>
          
        </div>
      );
    } else {
      return (
        <div className="popup">
          <div className={"popup_inner"}>
            <div className="informationPlayList">
              <h1 className="playListTitle">{this.state.playListName}</h1> <br />
              <h3 className="playListInformation">Genres:</h3>

              <ul>{listGenres.map(function (genre, index) {
                return <li key="index">{genre}</li>
              })}</ul>

              <h3 className="playListInformation">Playlist name:</h3>
              <span>{this.state.playListName}</span> <br />
              <h3 className="playListInformation">Created by:</h3>
              <span>{this.state.userName}</span> <br />
              <h3 className="playListInformation">Description:</h3>
              <span>{this.state.description}</span> <br />
              <a className="spotifyLink" href={this.state.spotify} target="_blank">Listen to it now!</a>
            </div>
            <br />
          </div>
          <button className="closeBtn">Close</button>
        </div>
      );
    }
  }
}

export default Popup;