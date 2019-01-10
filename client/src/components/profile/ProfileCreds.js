import React, { Component } from "react";
import isEmpty from "../../utils/isEmpty";
import Moment from "react-moment";

class ProfileCreds extends Component {
  render() {
    const { education, experience } = this.props;
    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Experience</h3>
          <ul className="list-group">
            {experience.map((exp, index) => (
              <li key={index} className="list-group-item">
                <h4>{exp.company}</h4>
                <p>
                  <Moment format="DD/MM/YYYY">{exp.from}</Moment> -
                  {exp.to === null ? (
                    " Current"
                  ) : (
                    <Moment format="DD/MM/YYYY">{exp.to}</Moment>
                  )}
                </p>
                <p>
                  <strong>Position:</strong> {exp.title}
                </p>
                <p>
                  <strong>Location:</strong>{" "}
                  {isEmpty(exp.location) ? "" : exp.location}
                </p>
                <p>
                  <strong>Description:</strong>{" "}
                  {isEmpty(exp.description) ? "" : exp.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-6">
          <h3 className="text-center text-info">Education</h3>
          <ul className="list-group">
            {education.map((edu, index) => (
              <li key={index} className="list-group-item">
                <h4>{edu.school}</h4>
                <p>
                  <Moment format="DD/MM/YYYY">{edu.from}</Moment> -
                  {edu.to === null ? (
                    " Current"
                  ) : (
                    <Moment format="DD/MM/YYYY">{edu.to}</Moment>
                  )}
                </p>
                <p>
                  <strong>Degree: </strong>
                  {edu.degree}
                </p>
                <p>
                  <strong>Field Of Study: </strong>
                  {edu.fieldOfStudy}
                </p>
                <p>
                  <strong>Description: </strong>
                  {isEmpty(edu.description) ? "" : edu.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default ProfileCreds;
