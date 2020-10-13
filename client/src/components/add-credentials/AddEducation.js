/** @format */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import TextFieldGroup from '../common/TextFieldGroup';
import PropTypes from 'prop-types';
import {addEducation} from '../../actions/profileActions';

class AddEducation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      school: '',
      degree: '',
      fieldofstudy: '',
      from: '',
      to: '',
      current: false,
      description: '',
      errors: {},
      disabled: false,
    };
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.errors) {
      return {
        errors: nextProps.errors,
      };
    }
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value});
  };

  handleSubmit = e => {
    e.preventDefault();

    const eduData = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description,
    };

    this.props.addEducation(eduData, this.props.history);
  };

  handleCheck = () => {
    this.setState({disabled: !this.state.disabled, current: !this.state.current});
  };

  render() {
    const {errors} = this.state;
    return (
      <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Education</h1>
              <p className="lead text-center">Add any school, bootcamp, etc that you have attended</p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.handleSubmit}>
                <TextFieldGroup placeholder="* School Name" name="school" value={this.state.school} handleChange={this.handleChange} errors={errors.school} />
                <TextFieldGroup placeholder="* Degree or Certification" name="degree" value={this.state.degree} handleChange={this.handleChange} errors={errors.degree} />
                <TextFieldGroup placeholder="* Field of study" name="fieldofstudy" value={this.state.fieldofstudy} handleChange={this.handleChange} errors={errors.fieldofstudy} />
                <h6>From Date</h6>
                <TextFieldGroup name="from" type="date" value={this.state.from} handleChange={this.handleChange} errors={errors.from} />
                <h6>To Date</h6>
                <TextFieldGroup name="to" type="date" value={this.state.to} handleChange={this.handleChange} errors={errors.to} disabled={this.state.disabled ? 'disabled' : ''} />
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="current"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.handleCheck}
                    id="current"
                  />
                  <label htmlFor="current" className="form-check-label">
                    Current Education
                  </label>
                </div>
                <TextAreaFieldGroup
                  placeholder="Program Description"
                  name="description"
                  value={this.state.description}
                  handleChange={this.handleChange}
                  errors={errors.description}
                  info="Tell us about the progream that you were in"
                />
                <input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddEducation.propTypes = {
  profile: PropTypes.object.isRequired,
  addEducation: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors,
});

export default connect(mapStateToProps, {addEducation})(withRouter(AddEducation));
