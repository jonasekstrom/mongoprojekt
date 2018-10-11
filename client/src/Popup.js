 import React, { Component } from 'react';
import './Popup.css';

import { connect } from "react-redux"
import action from "./actions.js"

class Popup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nameValidate: true,
      descValidate: true,
      spotifyValidate: true,
      playListName: "",
      genres: [],
      description: "",
      spotify: "",
      listId: "",
      checked: [],
      edited: true,
      // updatedList: this.props.updatedList,
    }
    this.editValues = this.editValues.bind(this);
    // this.changeClass = this.changeClass.bind(this);
  }


  editValues(nameOfClass, data) {
    switch (nameOfClass) {
      case "editPlayList":
        if (data.length > 15) {
          console.log("Name of your list is to long");
          this.setState({
            playListName: this.props.popup.playListName,
            edited: false
          })
        } else {
          this.setState({ playListName: data, listId: this.props.listId, userId: this.props.userId, userName: this.props.userName, edited: false })
        }
        break;
      case "editDescription":
        if (data.length > 150) {
          console.log("Description is waaaay to long. No one will read all that.");
          this.setState({
            description: this.props.popup.description,
            edited: false
          })
        } else {
          this.setState({ description: data, listId: this.props.listId, userId: this.props.userId, userName: this.props.userName, edited: false })
        }
        break;
      case "editUrl":
        this.setState({ spotify: data, listId: this.props.listId, userId: this.props.userId, userName: this.props.userName, edited: false })
        break;
      default:
    }
  }

  isDisabled = id => {
    return (
      this.state.checked.length > 1 && this.state.checked.indexOf(id) === -1
    );
  };

  changeInput(event) {
    let nameOfClass = event.target.className
    this.editValues(nameOfClass, event.target.textContent);
  }

  onChange = (event) => {
    let arr = [...this.state.genres];

    if (event.target.name === "genre") {
      arr.push(event.target.value);
      this.setState(() => {
        return { checked: arr, edited: false };
      });

      this.setState({
        listId: this.props.listId,
        userId: this.props.userId,
        userName: this.props.userName,
        genres: arr,
        edited: false
      });

      let newArr = arr;
      let h, i, j;

      for (h = 0; h < arr.length; h++) {
        let currentGenre = arr[h];
        let foundCount = 0;
        for (i = 0; i < arr.length; i++) {
          if (arr[i] === arr[h])
            foundCount++;
        }
        if (foundCount > 1) {
          for (j = 0; j < newArr.length; j++) {
            if (newArr[j] === currentGenre) {
              newArr.splice(j, 1);
              j--;
            }
          }
        }
      }
    }
  }

  clearState() {
    this.setState(() => {
      return {
        genres: [],
        checked: [],
        playListName: "",
        description: "",
        spotify: "",
        edited: true};

    });
  }

  isDisabled = genre => {
    return (
      this.state.checked.length > 2 && this.state.checked.indexOf(genre) === -1
    );
  };

  updateDb = data => {
    let objToDb = {
      _id: data._id,
      playListName: data.playListName,
      userName: data.userName,
      creator: this.props.userId,
      genres: data.genres,
      description: data.description,
      spotify: data.spotify
    }

    let url = "http://localhost:5000/updateplaylist";
    let self = this;
    fetch(url, {
      method: 'post',
      body: JSON.stringify(objToDb),
    }).then(function (response) {
      return response.text();
    }).then(function (response) {
      self.props.dispatch(action.clearPopupUpdate())
    });
  }

  render() {
    if (this.props.updatedList._id !== undefined) {
      this.updateDb(this.props.updatedList);
    }

    let allowedToEdit = this.props.popup.creator;
    let playListOwner = this.props.userId;
    let listGenres = this.props.popup.genres;
    let showPopup = this.props.showPopup;

    if (showPopup !== true) {
      return (
        <React.Fragment>
        </React.Fragment>
      )
    }
    if (allowedToEdit === playListOwner) {
      return (
        <div className="popup">
          <div className={"popup_inner"}>
            <div className="informationPlayList">
              <h1 className="playListTitle">{this.props.popup.playListName}</h1> <br />
              <h3 className="playListInformation">Genres:</h3>


              <div className="playListInformation" onChange={this.onChange}>
                <input type="checkbox" name="genre" value="rock" disabled={this.isDisabled("rock")} /> <span >Rock</span>
                <input type="checkbox" name="genre" value="metal" disabled={this.isDisabled("metal")} /> <span >Metal</span>
                <input type="checkbox" name="genre" value="classical" disabled={this.isDisabled("classical")} /> <span >Classical</span><br />
                <input type="checkbox" name="genre" value="country" disabled={this.isDisabled("country")} /> <span >Country</span>
                <input type="checkbox" name="genre" value="popmusic" disabled={this.isDisabled("pop")} /> <span >Pop</span>
                <input type="checkbox" name="genre" value="blues" disabled={this.isDisabled("blues")} /> <span >Blues</span>
                <input type="checkbox" name="genre" value="jazz" disabled={this.isDisabled("jazz")} /> <span >Jazz</span>
                <input type="checkbox" name="genre" value="electro" disabled={this.isDisabled("electro")} /> <span >Electro</span>
                <input type="checkbox" name="genre" value="hiphop" disabled={this.isDisabled("hiphop")} /> <span >Hiphop</span>
              </div>

              <h3 className="playListInformation">Playlist name:</h3>
              <span className="editPlayList" suppressContentEditableWarning="true" contentEditable="true" onInput={event => this.changeInput(event)}>{this.props.popup.playListName}</span> <br />
              <h3 className="playListInformation">Created by:</h3>
              <span className="playListUserName">{this.props.popup.userName}</span> <br />
              <h3 className="playListInformation">Description:</h3>
              <span className="editDescription" suppressContentEditableWarning="true" contentEditable="true" onInput={event => this.changeInput(event)}>{this.props.popup.description}</span>
              <h3 className="playListInformation">Spotify link:</h3>
              <span className="editUrl" suppressContentEditableWarning="true" contentEditable="true" onInput={event => this.changeInput(event)}>{this.props.popup.spotify}</span>
              <a className="spotifyLink" href={this.props.popup.spotify} target="">Listen to it now!</a>
            </div>
            <br />

          </div>
          <div>
            <button className="updateBtn" disabled={this.state.edited} onClick={(e) => { this.props.dispatch(action.updatePopup(this.state, this.props.popup)); this.clearState() }}>Update</button>
            <button className="closeBtn" onClick={(e) => { this.props.dispatch(action.closePopup()); this.clearState() }}>Close</button>
          </div>

        </div>

      );
    } else {
      return (
        <div className="popup">
          <div className={"popup_inner"}>
            <div className="informationPlayList">
              <h1 className="playListTitle">{this.props.popup.playListName}</h1> <br />
              <h3 className="playListInformation">Genres:</h3>

              <div className="container">
                <ul >{listGenres.map(function (genre, index) {
                  return <span className="genreInfo" key={index}>{genre}</span>
                })}</ul>
              </div>
              <h3 className="playListInformation">Playlist name:</h3>
              <span className="editPlayList">{this.props.popup.playListName}</span> <br />
              <h3 className="playListInformation">Created by:</h3>
              <span className="playListUserName">{this.props.popup.userName}</span> <br />
              <h3 className="playListInformation">Description:</h3>
              <span className="editDescription">{this.props.popup.description}</span> <br />
              <a className="spotifyLink" href={this.props.popup.spotify} target="">Listen to it now!</a>
            </div>
            <br />
          </div>
          <button className="soloCloseBtn" onClick={(e) => { this.props.dispatch(action.closePopup()); this.clearState() }}>Close</button>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    popup: state.popup,
    showPopup: state.showPopup,
    playListArray: state.playListArray,
    userId: state.id,
    listId: state.popup._id,
    userName: state.userName,
    updatedList: state.updatedList,
  }
}

export default connect(mapStateToProps)(Popup);
