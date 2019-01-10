import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropType from "prop-types";
import * as action from "../../actions/index";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

class AddExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: "",
      title: "",
      location: "",
      from: "",
      to: "",
      current: false,
      description: "",
      errors: {},
      disabled: false //if the current is true this will be true an will make the to field black
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ errors: nextProps.errors });
  }
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  onSubmit = event => {
    event.preventDefault();
    const value = {
      company: this.state.company,
      title: this.state.title,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };
    this.props.addExperience(value, this.props.history);
    console.log("submit");
  };
  onCheck = event => {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  };
  render() {
    return (
      <div className="section add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Your Experience</h1>
              <p className="lead text-center">
                Add any developer/programming positions that you have had in the
                past
              </p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  value={this.state.title}
                  onChange={this.onChange}
                  error={this.state.errors.title}
                  placeholder="* Job Title"
                  name="title"
                />

                <TextFieldGroup
                  placeholder="* Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={this.state.errors.company}
                />

                <TextFieldGroup
                  value={this.state.location}
                  onChange={this.onChange}
                  error={this.state.errors.location}
                  placeholder="Location"
                  name="location"
                />

                <h6>From Date</h6>
                <TextFieldGroup
                  value={this.state.from}
                  onChange={this.onChange}
                  error={this.state.errors.from}
                  name="from"
                  type="date"
                />

                <h6>To Date</h6>
                <TextFieldGroup
                  value={this.state.to}
                  onChange={this.onChange}
                  error={this.state.errors.to}
                  name="to"
                  type="date"
                  disabled={this.state.disabled ? "disabled" : ""}
                />
                {/*checkbox we dont create a seprate form for it*/}
                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="current"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.onCheck}
                    id="current"
                  />
                  <label className="form-check-label" htmlFor="current">
                    Current Job
                  </label>
                </div>

                <TextAreaFieldGroup
                  placeholder="Job Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={this.state.errors.description}
                  info="tell us about the postion"
                />
                <small className="form-text text-muted">
                  Some of your responsabilities, etc
                </small>

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
AddExperience.propTypes = {
  profile: PropType.object.isRequired,
  errors: PropType.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  action
)(withRouter(AddExperience));
