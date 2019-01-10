import React, { Component } from "react";
import { connect } from "react-redux";
import PropType from "prop-types";
import * as actions from "../../actions/index";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      errors: {}
    };
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    const { user } = this.props.auth;
    const { postId } = this.props;

    const newComment = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };
    this.props.addComment(newComment, postId);
    this.setState({ text: "" });
    console.log("submit");
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ errors: nextProps.errors });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            Make a comment...
          </div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Reply to post"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                  error={errors.text}
                />
              </div>
              <button
                onClick={this.onSubmit}
                type="submit"
                className="btn btn-dark"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
CommentForm.propTypes = {
  postId: PropType.string,
  addComment: PropType.func.isRequired,
  errors: PropType.object.isRequired,
  auth: PropType.object.isRequired
};
const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  actions
)(CommentForm);
