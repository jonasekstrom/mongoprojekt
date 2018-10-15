import React, { Component } from "react";

import "../App.css";
import { connect } from "react-redux";
import action from "../actions.js";

class Genres extends Component {
  render() {
    let rock = this.props.searchInfo.ROCK;
    let metal = this.props.searchInfo.METAL;
    let classical = this.props.searchInfo.CLASSICAL;
    let country = this.props.searchInfo.COUNTRY;
    let hiphop = this.props.searchInfo.HIPHOP;
    let electro = this.props.searchInfo.ELECTRO;
    let popMusic = this.props.searchInfo.POPMUSIC;
    let blues = this.props.searchInfo.BLUES;
    let jazz = this.props.searchInfo.JAZZ;

    return (
      <div className="genres">
        {rock ? (
          <span
            id="rockClicked"
            onClick={e =>
              this.props.dispatch(action.rockUnclicked(this.props.searchInfo))
            }
          >
            Rock
          </span>
        ) : (
          <span
            id="rock"
            onClick={e =>
              this.props.dispatch(action.rockClicked(this.props.searchInfo))
            }
          >
            Rock
          </span>
        )}

        {country ? (
          <span
            id="countryClicked"
            onClick={e =>
              this.props.dispatch(
                action.countryUnclicked(this.props.searchInfo)
              )
            }
          >
            Country
          </span>
        ) : (
          <span
            id="country"
            onClick={e =>
              this.props.dispatch(action.countryClicked(this.props.searchInfo))
            }
          >
            Country
          </span>
        )}

        {metal ? (
          <span
            id="metalClicked"
            onClick={e =>
              this.props.dispatch(action.metalUnclicked(this.props.searchInfo))
            }
          >
            Metal
          </span>
        ) : (
          <span
            id="metal"
            onClick={e =>
              this.props.dispatch(action.metalClicked(this.props.searchInfo))
            }
          >
            Metal
          </span>
        )}

        {classical ? (
          <span
            id="classicalClicked"
            onClick={e =>
              this.props.dispatch(
                action.classicalUnclicked(this.props.searchInfo)
              )
            }
          >
            Classical
          </span>
        ) : (
          <span
            id="classical"
            onClick={e =>
              this.props.dispatch(
                action.classicalClicked(this.props.searchInfo)
              )
            }
          >
            Classical
          </span>
        )}
        {popMusic ? (
          <span
            id="popClicked"
            onClick={e =>
              this.props.dispatch(action.popUnclicked(this.props.searchInfo))
            }
          >
            Pop
          </span>
        ) : (
          <span
            id="pop"
            onClick={e =>
              this.props.dispatch(action.popClicked(this.props.searchInfo))
            }
          >
            Pop
          </span>
        )}

        {jazz ? (
          <span
            id="jazzClicked"
            onClick={e =>
              this.props.dispatch(action.jazzUnclicked(this.props.searchInfo))
            }
          >
            Jazz
          </span>
        ) : (
          <span
            id="jazz"
            onClick={e =>
              this.props.dispatch(action.jazzClicked(this.props.searchInfo))
            }
          >
            Jazz
          </span>
        )}

        {blues ? (
          <span
            id="bluesClicked"
            onClick={e =>
              this.props.dispatch(action.bluesUnclicked(this.props.searchInfo))
            }
          >
            Blues
          </span>
        ) : (
          <span
            id="blues"
            onClick={e =>
              this.props.dispatch(action.bluesClicked(this.props.searchInfo))
            }
          >
            Blues
          </span>
        )}
        {hiphop ? (
          <span
            id="hiphopClicked"
            onClick={e =>
              this.props.dispatch(action.hiphopUnclicked(this.props.searchInfo))
            }
          >
            HipHop
          </span>
        ) : (
          <span
            id="hiphop"
            onClick={e =>
              this.props.dispatch(action.hiphopClicked(this.props.searchInfo))
            }
          >
            HipHop
          </span>
        )}
        {electro ? (
          <span
            id="electroClicked"
            onClick={e =>
              this.props.dispatch(
                action.electroUnclicked(this.props.searchInfo)
              )
            }
          >
            Electro
          </span>
        ) : (
          <span
            id="electro"
            onClick={e =>
              this.props.dispatch(action.electroClicked(this.props.searchInfo))
            }
          >
            Electro
          </span>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    searchInfo: state.playlist.searchInfo
  };
};

export default connect(mapStateToProps)(Genres);
