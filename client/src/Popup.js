import React, { Component } from "react";
import "./App.css";

import { connect } from "react-redux";
import action from "./actions.js";

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
      listGenres: [],
      clickedGenres: {
        rock: false,
        metal: false,
        classical: false,
        country: false,
        popmusic: false,
        blues: false,
        jazz: false,
        electro: false,
        hiphop: false
      }
      // updatedList: this.props.updatedList,
    };
    this.editValues = this.editValues.bind(this);
    // this.changeClass = this.changeClass.bind(this);
  }

  editValues(nameOfClass, data) {
    const { user } = this.props.auth;
    switch (nameOfClass) {
      case "editPlayList":
        if (data.length > 15) {
          console.log("Name of your list is to long");
          this.setState({
            playListName: this.props.popup.playListName,
            edited: true
          });
        } else {
          this.setState({
            playListName: data,
            listId: this.props.listId,
            userId: user.id,
            userName: user.name,
            edited: false
          });
        }
        break;
      case "editDescription":
        if (data.length > 150) {
          console.log(
            "Description is waaaay to long. No one will read all that."
          );
          this.setState({
            description: this.props.popup.description,
            edited: true
          });
        } else {
          this.setState({
            description: data,
            listId: this.props.listId,
            userId: user.id,
            userName: user.name,
            edited: false
          });
        }
        break;
      case "editUrl":
        this.setState({
          spotify: data,
          listId: this.props.listId,
          userId: user.id,
          userName: user.name,
          edited: false
        });
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
    let nameOfClass = event.target.className;
    this.editValues(nameOfClass, event.target.textContent);
  }

  clearState() {
    this.setState(() => {
      return {
        listGenres: [],
        genres: [],
        checked: [],
        playListName: "",
        description: "",
        spotify: "",
        edited: true,
        clickedGenres: {
          rock: false,
          metal: false,
          classical: false,
          country: false,
          popmusic: false,
          blues: false,
          jazz: false,
          electro: false,
          hiphop: false
        }
      };
    });
  }

  updateDb = data => {
    const { user } = this.props.auth;

    let objToDb = {
      _id: data._id,
      playListName: data.playListName.toLowerCase(),
      userName: data.userName,
      creator: user.id,
      genres: data.genres,
      description: data.description,
      spotify: data.spotify
    };

    let url = "http://localhost:5000/updateplaylist";
    let self = this;
    fetch(url, {
      method: "post",
      body: JSON.stringify(objToDb)
    })
      .then(function(response) {
        return response.text();
      })
      .then(function(response) {
        self.props.dispatch(action.clearPopupUpdate());
      });
  };

  clickGenre(val, fromCheckIfExist) {
    switch (val) {
      case "rock":
        this.setState({
          edited: false
        });
        this.checkIfExist(val);
        break;
      case "metal":
        this.setState({
          edited: false
        });
        this.checkIfExist(val);
        break;
      case "popmusic":
        this.setState({
          edited: false
        });
        this.checkIfExist(val);
        break;
      case "classical":
        this.setState({
          edited: false
        });
        this.checkIfExist(val);
        break;
      case "country":
        this.setState({
          edited: false
        });
        this.checkIfExist(val);
        break;
      case "jazz":
        this.setState({
          edited: false
        });
        this.checkIfExist(val);
        break;
      case "blues":
        this.setState({
          edited: false
        });
        this.checkIfExist(val);
        break;
      case "hiphop":
        this.setState({
          edited: false
        });
        this.checkIfExist(val);
        break;
      case "electro":
        this.setState({
          edited: false
        });
        this.checkIfExist(val);
        break;
      default:
    }
  }

  checkIfExist(val) {
    const { user } = this.props.auth;
    let newList = this.state.listGenres.filter(data => data === val);
    if (newList.length === 0) {
      if (this.state.listGenres.length === 3) {
        this.setState({
          message: "You can only have max three genres"
        });
        return;
      }

      let newClickedGenres = {};

      for (let x in this.state.clickedGenres) {
        if (val === x) {
          newClickedGenres[val] = true;
        } else {
          newClickedGenres[x] = this.state.clickedGenres[x];
        }
      }

      this.setState({
        clickedGenres: newClickedGenres,
        message: "",
        listGenres: [...this.state.listGenres, val],
        genres: [...this.state.listGenres, val],
        listId: this.props.listId,
        userId: user.id,
        userName: user.name,
        edited: false
      });
    } else {
      let newClickedGenres = {};

      for (let x in this.state.clickedGenres) {
        if (val === x) {
          newClickedGenres[val] = false;
        } else {
          newClickedGenres[x] = this.state.clickedGenres[x];
        }
      }

      let newList = this.state.listGenres.filter(data => data !== val);

      this.setState({
        clickedGenres: newClickedGenres,
        message: "",
        genres: [...newList],
        listGenres: [...newList],
        listId: this.props.listId,
        userId: user.id,
        userName: user.name,
        edited: false
      });
    }
  }
  removeThis(ev) {
    let self = this;
    fetch("http://localhost:5000/delete", {
      //mode: 'no-cors',
      method: "POST",
      // headers: {
      // Accept: 'application/json',
      // },
      body: JSON.stringify(this.props.popup.listId)
    }).then(function(response) {
      return response;
    });
    //console.log(response)
    // self.props.dispatch(action.deleteList(self.props.playListArray))
    self.props.dispatch(action.deleteList(self.props.popup.listId));
  }
  render() {
    const { user } = this.props.auth;
    if (this.props.updatedList._id !== undefined) {
      this.updateDb(this.props.updatedList);
    }

    let rock = this.state.clickedGenres.rock;
    let metal = this.state.clickedGenres.metal;
    let classical = this.state.clickedGenres.classical;
    let country = this.state.clickedGenres.country;
    let popMusic = this.state.clickedGenres.popmusic;
    let blues = this.state.clickedGenres.blues;
    let jazz = this.state.clickedGenres.jazz;
    let electro = this.state.clickedGenres.electro;
    let hiphop = this.state.clickedGenres.hiphop;

    let allowedToEdit = this.props.popup.creator;
    let playListOwner = user.id;
    let listGenres = this.props.popup.genres;
    let showPopup = this.props.showPopup;

    if (showPopup !== true) {
      return <React.Fragment />;
    }
    if (allowedToEdit === playListOwner) {
      return (
        <div className="popup">
          <div className={"popup_inner"}>
            <div>
              <h2 className="playListTitle">{this.props.popup.playListName}</h2>{" "}
              <br />
              <h4 className="playListInformation">Genres:</h4>
              <ul>
                {listGenres.map(function(genre, index) {
                  return (
                    <span className="genreInfo" key={index}>
                      {genre}
                    </span>
                  );
                })}
              </ul>
              <ul>
                {rock ? (
                  <li
                    id="rockUnderline"
                    className="onClick"
                    onClick={e => this.clickGenre("rock")}
                  >
                    Rock
                  </li>
                ) : (
                  <li id="rockUnderline" onClick={e => this.clickGenre("rock")}>
                    Rock
                  </li>
                )}
                {metal ? (
                  <li
                    id="metalUnderline"
                    className="onClick"
                    onClick={e => this.clickGenre("metal")}
                  >
                    Metal
                  </li>
                ) : (
                  <li
                    id="metalUnderline"
                    onClick={e => this.clickGenre("metal")}
                  >
                    Metal
                  </li>
                )}
                {popMusic ? (
                  <li
                    id="popUnderline"
                    className="onClick"
                    onClick={e => this.clickGenre("popmusic")}
                  >
                    Pop
                  </li>
                ) : (
                  <li
                    id="popUnderline"
                    onClick={e => this.clickGenre("popmusic")}
                  >
                    Pop
                  </li>
                )}
                {classical ? (
                  <li
                    id="classicalUnderline"
                    className="onClick"
                    onClick={e => this.clickGenre("classical")}
                  >
                    Classical
                  </li>
                ) : (
                  <li
                    id="classicalUnderline"
                    onClick={e => this.clickGenre("classical")}
                  >
                    Classical
                  </li>
                )}
                {country ? (
                  <li
                    id="countryUnderline"
                    className="onClick"
                    onClick={e => this.clickGenre("country")}
                  >
                    Country
                  </li>
                ) : (
                  <li
                    id="countryUnderline"
                    onClick={e => this.clickGenre("country")}
                  >
                    Country
                  </li>
                )}
                {jazz ? (
                  <li
                    id="jazzUnderline"
                    className="onClick"
                    onClick={e => this.clickGenre("jazz")}
                  >
                    Jazz
                  </li>
                ) : (
                  <li id="jazzUnderline" onClick={e => this.clickGenre("jazz")}>
                    Jazz
                  </li>
                )}
                {blues ? (
                  <li
                    id="bluesUnderline"
                    className="onClick"
                    onClick={e => this.clickGenre("blues")}
                  >
                    Blues
                  </li>
                ) : (
                  <li
                    id="bluesUnderline"
                    onClick={e => this.clickGenre("blues")}
                  >
                    Blues
                  </li>
                )}
                {electro ? (
                  <li
                    id="electroUnderline"
                    className="onClick"
                    onClick={e => this.clickGenre("electro")}
                  >
                    Electro
                  </li>
                ) : (
                  <li
                    id="electroUnderline"
                    onClick={e => this.clickGenre("electro")}
                  >
                    Electro
                  </li>
                )}
                {hiphop ? (
                  <li
                    id="hiphopUnderline"
                    className="onClick"
                    onClick={e => this.clickGenre("hiphop")}
                  >
                    Hiphop
                  </li>
                ) : (
                  <li
                    id="hiphopUnderline"
                    onClick={e => this.clickGenre("hiphop")}
                  >
                    Hiphop
                  </li>
                )}
              </ul>
              <h4>Playlist name:</h4>
              <span
                className="editPlayList"
                suppressContentEditableWarning="true"
                contentEditable="true"
                onInput={event => this.changeInput(event)}
              >
                {this.props.popup.playListName}
              </span>{" "}
              <br />
              <h4>Created by:</h4>
              <span className="playListUserName">
                {this.props.popup.userName}
              </span>{" "}
              <br />
              <h4>Description:</h4>
              <span
                className="editDescription"
                suppressContentEditableWarning="true"
                contentEditable="true"
                onInput={event => this.changeInput(event)}
              >
                {this.props.popup.description}
              </span>
              <h4 id="spotify">Spotify link:</h4>
              <span
                className="editUrl"
                suppressContentEditableWarning="true"
                contentEditable="true"
                onInput={event => this.changeInput(event)}
              >
                {this.props.popup.spotify}
              </span>
            </div>
            <a
              className="spotifyLink"
              href={this.props.popup.spotify}
              rel="noopener noreferrer"
              target="_blank"
            >
              Listen to it now!
            </a>
            <button className="removeBtnz" onClick={this.removeThis.bind(this)}>
              Remove this List
            </button>
            <br />
          </div>
          <div className="updateClose">
            <div>
              <button
                disabled={this.state.edited}
                onClick={e => {
                  this.props.dispatch(
                    action.updatePopup(this.state, this.props.popup)
                  );
                  this.clearState();
                }}
              >
                Update
              </button>
              <button
                onClick={e => {
                  this.props.dispatch(action.closePopup());
                  this.clearState();
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="popup">
          <div className={"popup_inner"}>
            <div className="informationPlayList">
              <h2 className="playListTitle">{this.props.popup.playListName}</h2>{" "}
              <br />
              <h4 className="playListInformation">Genres:</h4>
              <div className="container">
                <ul>
                  {listGenres.map(function(genre, index) {
                    return (
                      <span className="genreInfo" key={index}>
                        {genre}
                      </span>
                    );
                  })}
                </ul>
              </div>
              <h4 className="playListInformation">Playlist name:</h4>
              <span className="editPlayList">
                {this.props.popup.playListName}
              </span>{" "}
              <br />
              <h4 className="playListInformation">Created by:</h4>
              <span className="playListUserName">
                {this.props.popup.userName}
              </span>{" "}
              <br />
              <h4 className="playListInformation">Description:</h4>
              <span className="editDescription">
                {this.props.popup.description}
              </span>{" "}
              <br />
              <a
                className="spotifyLink"
                href={this.props.popup.spotify}
                rel="noopener noreferrer"
                target="_blank"
              >
                Listen to it now!
              </a>
            </div>
            <br />
          </div>
          <div className="updateClose">
            <div>
              <button
                onClick={e => {
                  this.props.dispatch(action.closePopup());
                  this.clearState();
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    popup: state.playlist.popup,
    showPopup: state.playlist.showPopup,
    playListArray: state.playlist.playListArray,
    userId: state.playlist.id,
    listId: state.playlist.popup._id,
    userName: state.playlist.userName,
    updatedList: state.playlist.updatedList,
    auth: state.auth
  };
};

export default connect(mapStateToProps)(Popup);
