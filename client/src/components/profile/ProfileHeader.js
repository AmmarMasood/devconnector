import React, { Component } from "react";
import isEmpty from "../../utils/isEmpty";

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-info text-white mb-3">
            <div className="row">
              <div className="col-4 col-md-3 m-auto">
                <img
                  className="rounded-circle"
                  src={profile._user.avatar}
                  alt=""
                />
              </div>
            </div>
            <div className="text-center">
              <h1 className="display-4 text-center">{profile._user.name}</h1>
              <p className="lead text-center">
                {profile.status}
                {/*we do isEmpty to make sure that if the input is empty we dont return ERRO*/}
                {isEmpty(profile.company) ? null : (
                  <span> at {profile.company}</span>
                )}
              </p>
              {/*Profile location*/}
              {isEmpty(profile.location) ? null : <p>{profile.location}</p>}

              {/*Displaying the social icons with links and making sure they are empty or not*/}
              <p>
                {isEmpty(profile.website) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.website}
                    target="_blank"
                  >
                    <i className="fas fa-globe fa-2x" />
                  </a>
                )}
                {isEmpty(profile.socials && profile.socials.twitter) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.socials.twitter}
                    target="_blank"
                  >
                    <i className="fab fa-twitter fa-2x" />
                  </a>
                )}
                {isEmpty(profile.socials && profile.socials.facebook) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.socials.facebook}
                    target="_blank"
                  >
                    <i className="fab fa-facebook fa-2x" />
                  </a>
                )}
                {isEmpty(profile.socials && profile.socials.linkedin) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.socials.linkedin}
                    target="_blank"
                  >
                    <i className="fab fa-linkedin fa-2x" />
                  </a>
                )}
                {isEmpty(
                  profile.socials && profile.socials.instagram
                ) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.socials.instagram}
                    target="_blank"
                  >
                    <i className="fab fa-instagram fa-2x" />
                  </a>
                )}
                {isEmpty(profile.socials && profile.socials.youtube) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.socials.youtube}
                    target="_blank"
                  >
                    <i className="fab fa-youtube fa-2x" />
                  </a>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileHeader;
