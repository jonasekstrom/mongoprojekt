import React, { Component } from "react";

import "../App.css";
import { connect } from "react-redux";
import action from "../actions.js";
import { logoutUser } from "../actions/authActions";
import { clearCurrentProfile } from "../actions/authActions";

class RemoveLists extends Component {
  removeAll(ev) {
    const { user } = this.props.auth;

    let self = this;
    fetch("/deleteAll", {
      method: "POST",
      body: JSON.stringify(user.id),
      headers: {
        Authorization: `${localStorage.getItem("jwtToken")}`
      }
    }).then(function(response) {
      return response;
    });
    self.props.dispatch(action.deleteAllLists(user.id));
  }

  removeAccount(ev) {
    const { user } = this.props.auth;
    // let self = this;
    fetch("/accountdeletion", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        Authorization: `${localStorage.getItem("jwtToken")}`
      }
    }).then(function(response) {
      return response;
    });

    this.removeAll();
    this.props.dispatch(clearCurrentProfile());
    this.props.dispatch(logoutUser());
  }

  render() {
    const { user } = this.props.auth;

    return (
      <React.Fragment>
        <div className="userInformation">
          <h2>User Information</h2>
          <img className="userImget" alt="" src={user.img} />
          <h3>{user.name}</h3>

          <button className="btnUser" onClick={this.removeAccount.bind(this)}>
            Remove Account
          </button>
          <button className="btnUser" onClick={this.removeAll.bind(this)}>
            Remove All Lists
          </button>
        </div>
      </React.Fragment>
    );
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

export default connect(mapStateToProps)(RemoveLists);
