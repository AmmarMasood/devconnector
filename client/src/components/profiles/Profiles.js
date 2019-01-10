import React, { Component } from "react";
import { connect } from "react-redux";
import PropType from "prop-types";
import Spinner from "../common/Spinner";
import * as actions from "../../actions/index";
import ProfileItem from "./ProfileItem";

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }
  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;
    //we want o check if there are any profiles, while we are doing this we run spinner, and if we have no profile we will return No profile found else all profiles will be shown.
    if (profiles === null || loading === true) {
      profileItems = <Spinner />;
    } else {
      if (profiles.length < 0) {
        profileItems = <h3>No Profiles Found....</h3>;
      } else {
        profileItems = profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ));
      }
    }
    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Developer Profiles</h1>
              <p className="lead text-center">Browser and Connect Developers</p>
              {profileItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profiles.PropType = {
  profile: PropType.object.isRequired,
  getProfiles: PropType.func.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  actions
)(Profiles);
