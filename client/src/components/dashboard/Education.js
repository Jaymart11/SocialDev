/** @format */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {deleteEducation} from '../../actions/profileActions';

class Education extends Component {
  handleClick = id => {
    this.props.deleteEducation(id);
  };
  render() {
    const education = this.props.education.map(exp => (
      <tr key={exp._id}>
        <td>{exp.school}</td>
        <td>{exp.degree}</td>
        <td>{exp.fieldofstudy}</td>
        <td>
          {exp.from.slice(0, 10).replaceAll('-', '/')} - {exp.to === null ? 'Now' : exp.to.slice(0, 10).replaceAll('-', '/')}
        </td>
        <td>
          <button className="btn btn-danger" onClick={() => this.handleClick(exp._id)}>
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-2"> Education Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Field of study</th>
              <th>Years</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{education}</tbody>
        </table>
      </div>
    );
  }
}

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, {deleteEducation})(Education);
