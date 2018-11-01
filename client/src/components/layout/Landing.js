import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { statsForLanding } from "../../actions/authActions";
import "./landing.css";

class Landing extends Component {
  componentDidMount() {
    this.props.dispatch(statsForLanding());
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/header");
    }
  }
  render() {
    const { stats } = this.props.auth;
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center buttonsDiv">
                <h1 className="display-3 mb-4">Share your music</h1>
                <p className="lead">It should be easy to find new music</p>
                <hr />
                <Link to="/register" className="buttons head">
                  Register
                </Link>
                <Link to="/login" className="buttons head">
                  Login
                </Link>
                <p>
                  Over {stats.userCount}
                  million users has already shared {stats.playlistCount}
                  million playlists
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Landing.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(Landing);
