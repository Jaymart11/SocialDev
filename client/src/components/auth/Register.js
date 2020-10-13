/** @format */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {registerUser} from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {},
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  static getDerivedStateFromProps(props) {
    if (props.errors) {
      return {errors: props.errors};
    }
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value});
  };

  handleSubmit = e => {
    e.preventDefault();

    const {name, email, password, password2} = this.state;
    const newUser = {
      name,
      email,
      password,
      password2,
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const {name, email, password, password2, errors} = this.state;
    return (
      <div className="register" style={{height: '80vh'}}>
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevConnector account</p>
              <form noValidate onSubmit={this.handleSubmit}>
                <TextFieldGroup type="text" placeholder="Name" name="name" value={name} handleChange={this.handleChange} errors={errors.name} />
                <TextFieldGroup
                  placeholder="Email Address"
                  name="email"
                  type="email"
                  value={email}
                  errors={errors.email}
                  handleChange={this.handleChange}
                  info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                />
                <TextFieldGroup
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  handleChange={this.handleChange}
                  errors={errors.password}
                  autocomplete="off"
                />
                <TextFieldGroup
                  type="password"
                  placeholder="Confirm Password"
                  name="password2"
                  value={password2}
                  handleChange={this.handleChange}
                  errors={errors.password2}
                  autocomplete="off"
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({auth: state.auth, errors: state.errors});

export default connect(mapStateToProps, {registerUser})(withRouter(Register));
