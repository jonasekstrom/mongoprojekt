import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";


class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/header");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.dispatch(loginUser(userData));
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      // <div className="login">
      <div className="landing">
      <div className="dark-overlay landing-inner text-light">
        <div className="container">
          <div className="row">
            {/* <div className="col-md-8 m-auto"> */}
            <div className="col-md-12 text-center">
              {/* <h1 className="display-4 text-center text-white">Login</h1> */}
              <h1 className="display-3 mb-4">Login</h1>
              <p className="lead text-center">
                Login to your Share Your Music account
              </p>
              <div className="col-md-12 text-center">
              <hr/>
              </div>
              
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                />
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
                <input value="Login" type="submit" className="btn btn-info btn-block mr-2" />
                <button className="btn btn-light" onClick={e => this.props.history.push("/")}>Back</button>
              </form>
            </div>
          </div>
        </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  playlist: state.playlist,
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps)(Login);
