import React, { Component } from "react";
import { connect } from "react-redux";
import PropType from "prop-types";
import { Link } from "react-router-dom";
import * as actions from "../../actions/index";
import ProfileGithub from "./ProfileGithub";
import ProfileAbout from "./ProfileAbout";
import ProfileCreds from "./ProfileCreds";
import ProfileHeader from "./ProfileHeader";
import Spinner from "../common/Spinner";

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      //this will check if there are any params in url
      this.props.getProfileByHandle(this.props.match.params.handle); //this will pass that param to the action
    }
  }
  //this will make sure if the sipnner is true and profile is null so instead to just showing a contineues spinner we send the user to not-found component
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.profile.profile === null &&
      this.props.profile.loading === true
    ) {
      this.props.history.push("/not-found");
    }
  }
  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;
    if (profile === null || loading === true) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Back To Profiles
              </Link>
            </div>
            <div className="col-md-6" />
          </div>
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileCreds
            education={profile.education}
            experience={profile.experience}
          />
          {profile.githubusername ? (
            <ProfileGithub username={profile.githubusername} />
          ) : (
            "Please enter github username to get all of your repos here!"
          )}
        </div>
      );
    }
    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }
}
Profile.propType = {
  profile: PropType.object.isRequired,
  getProfileByHandle: PropType.func.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(
  mapStateToProps,
  actions
)(Profile);
