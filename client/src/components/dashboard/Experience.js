/** @format */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {deleteExperience} from '../../actions/profileActions';

class Experience extends Component {
  handleClick = id => {
    this.props.deleteExperience(id);
  };
  render() {
    const experience = this.props.experience.map(exp => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
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
        <h4 className="mb-2"> Experience Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{experience}</tbody>
        </table>
      </div>
    );
  }
}

Experience.propTypes = {
  deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, {deleteExperience})(Experience);
