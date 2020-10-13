/** @format */

import React, {Component} from 'react';
import isEmpty from '../../validation/is-empty';
import PropTypes from 'prop-types';

class ProfileAbout extends Component {
  render() {
    const {profile} = this.props;

    const firstName = profile.user.name.trim().split(' ')[0];
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">{firstName}'s Bio</h3>
            <p className="lead text-center">{isEmpty(profile.bio) ? <span>{firstName} does not have a bio</span> : <p>{profile.bio}</p>}</p>
            <hr />
            <h3 className="text-center text-info">Skill Set</h3>
            <div className="row d-flex justify-content-center">
              <div className="d-flex flex-wrap">
                {profile.skills.map((skill, index) => (
                  <div className="p-3" key={index}>
                    <i className="fa fa-check"></i> {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
