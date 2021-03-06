import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropType from "prop-types";
import isEmpty from "../../utils/isEmpty";

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;
    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            <img src={profile._user.avatar} alt="" className="rounded-circle" />
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <h3>{profile._user.name}</h3>
            <p>
              {/*we use turenry because we dont wna to return developer at NULL*/}
              {profile.status}{" "}
              {isEmpty(profile.company) ? null : (
                <span>at {profile.company}</span>
              )}
            </p>
            <p>
              {isEmpty(profile.location) ? null : (
                <span>{profile.location}</span>
              )}
            </p>
            <button className="btn btn-info">
              <Link to={`/profile/${profile.handle}`} className="text-white">
                View Profile
              </Link>
            </button>
          </div>
          <div className="col-md-4 d-none d-md-block">
            <h4>Skill Set</h4>
            <ul className="list-group">
              {/*we will map through skills array and return each skill, but only first 4*/}
              {profile.skills.slice(0, 4).map((skill, index) => (
                <li key={index} className="list-group-item">
                  <i className="fa fa-check pr-1" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
ProfileItem.PropType = {
  profile: PropType.object.isRequired
};
export default ProfileItem;
