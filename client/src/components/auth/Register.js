import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";
import RadioButtonField from "../common/RadioButtonField";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      userImg:
        "https://files.slack.com/files-pri/T6RE0MQD7-FDG69TTPS/avatar1295831_640.png",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/header");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      userImg: this.state.userImg
    };

    this.props.registerUser(newUser, this.props.history);
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              {/* <div className="col-md-8 m-auto"> */}
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Register</h1>
                <p className="lead text-center">
                  Create your own Share Your Music account
                </p>
                <hr />
                <form noValidate onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <TextFieldGroup
                      placeholder="Name"
                      name="name"
                      type="text"
                      value={this.state.name}
                      onChange={this.onChange}
                      error={errors.name}
                    />
                  </div>
                  <div className="form-group">
                    <TextFieldGroup
                      placeholder="Email"
                      name="email"
                      type="email"
                      value={this.state.email}
                      onChange={this.onChange}
                      error={errors.email}
                    />
                  </div>
                  <div className="form-group">
                    <TextFieldGroup
                      placeholder="Password"
                      name="password"
                      type="password"
                      value={this.state.password}
                      onChange={this.onChange}
                      error={errors.password}
                    />
                  </div>
                  <div className="form-group">
                    <TextFieldGroup
                      placeholder="Verify password"
                      name="password2"
                      type="password"
                      value={this.state.password2}
                      onChange={this.onChange}
                      error={errors.password2}
                    />
                  </div>
                  <div>
                    <h3>Choose your avatar</h3>
                  </div>
                  <div className="form-group2">
                    <RadioButtonField
                      type="radio"
                      name="userImg"
                      onChange={this.onChange}
                      value="https://files.slack.com/files-pri/T6RE0MQD7-FDGU1FKQS/avatar-1606914_640_.png"
                      checked={
                        this.state.userImg ===
                        "https://files.slack.com/files-pri/T6RE0MQD7-FDGU1FKQS/avatar-1606914_640_.png"
                      }
                      src="https://files.slack.com/files-pri/T6RE0MQD7-FDGU1FKQS/avatar-1606914_640_.png"
                    />
                    <RadioButtonField
                      type="radio"
                      name="userImg"
                      onChange={this.onChange}
                      value="https://files.slack.com/files-pri/T6RE0MQD7-FDG69QV24/man156584_640.png"
                      checked={
                        this.state.userImg ===
                        "https://files.slack.com/files-pri/T6RE0MQD7-FDG69QV24/man156584_640.png"
                      }
                      src="https://files.slack.com/files-pri/T6RE0MQD7-FDG69QV24/man156584_640.png"
                    />
                    <RadioButtonField
                      type="radio"
                      name="userImg"
                      onChange={this.onChange}
                      value="https://files.slack.com/files-pri/T6RE0MQD7-FDH4BK17F/man3414477_640.png"
                      checked={
                        this.state.userImg ===
                        "https://files.slack.com/files-pri/T6RE0MQD7-FDH4BK17F/man3414477_640.png"
                      }
                      src="https://files.slack.com/files-pri/T6RE0MQD7-FDH4BK17F/man3414477_640.png"
                    />
                    <RadioButtonField
                      type="radio"
                      name="userImg"
                      onChange={this.onChange}
                      value="https://files.slack.com/files-pri/T6RE0MQD7-FDG69TTPS/avatar1295831_640.png"
                      checked={
                        this.state.userImg ===
                        "https://files.slack.com/files-pri/T6RE0MQD7-FDG69TTPS/avatar1295831_640.png"
                      }
                      src="https://files.slack.com/files-pri/T6RE0MQD7-FDG69TTPS/avatar1295831_640.png"
                    />
                  </div>
                  <br />
                  <br />
                  <input
                    value="Submit"
                    type="submit"
                    className="buttons login"
                  />
                  <button
                    type="button"
                    className="buttons login"
                    onClick={e => this.props.history.push("/")}
                  >
                    Back
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
