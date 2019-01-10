import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import * as actions from "../../actions/index";
import Spinner from "../common/Spinner";
import ProfileActions from "./ProfileActions";
import Experience from "./Experience";
import Education from "./Education";

class dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  onDeleteClick = () => {
    this.props.deleteAccount();
  };

  render() {
    const { user } = this.props.auth;
    const { loading, profile } = this.props.profile;

    let dashboardContent;
    if (loading === true || profile === null) {
      dashboardContent = <Spinner />;
    } else {
      //if user has a profile
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead muted-text">
              Welcome,{" "}
              <Link to={`/profile/${profile.handle}`}>{user.name}</Link>!
            </p>
            <ProfileActions />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
            {/*delete edu and exp*/}
            <div style={{ marginBottom: "60px" }}>
              <button className="btn btn-danger" onClick={this.onDeleteClick}>
                Delete my Account
              </button>
            </div>
          </div>
        );
      } else {
        //if user is loggedin but has not profile
        dashboardContent = (
          <div>
            <p className="lead muted-text">Welcome, {user.name}!</p>
            <p>You have not yet setup the profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboad">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  actions
)(dashboard);
