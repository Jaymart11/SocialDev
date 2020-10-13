/** @format */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loginUser} from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errors: {},
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      nextProps.history.push('/dashboard');
    }

    if (nextProps.errors) {
      return {errors: nextProps.errors};
    }
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value});
  };

  handleSubmit = e => {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginUser(user);
  };

  render() {
    const {errors, password, email} = this.state;
    return (
      <div className="login" style={{height: '80vh'}}>
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Sign in to your SocialDev account</p>
              {errors.noMatch ? (
                <div class="alert alert-danger" role="alert">
                  {errors.noMatch}
                </div>
              ) : (
                ''
              )}
              <form noValidate onSubmit={this.handleSubmit}>
                <TextFieldGroup placeholder="Email Address" name="email" type="email" errors={errors.email || errors.noMatch} value={email} handleChange={this.handleChange} />
                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  errors={errors.password || errors.noMatch}
                  value={password}
                  handleChange={this.handleChange}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, {loginUser})(Login);
