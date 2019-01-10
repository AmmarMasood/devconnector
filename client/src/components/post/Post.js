import React, { Component } from "react";
import * as actions from "../../actions/index";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropType from "prop-types";
import Spinner from "../common/Spinner";
import PostItem from "../posts/PostItem";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";

class Post extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id); //getting the id from params
  }
  render() {
    const { post, loading } = this.props.post;
    let PostContents; /*making sure post isnt empty*/
    if (post === null || loading === true || Object.keys(post).length === 0) {
      PostContents = <Spinner />;
    } else {
      PostContents = (
        <div>
          <PostItem post={post} showActions={false} />;
          <CommentForm postId={post._id} />
          <CommentFeed postId={post._id} comments={post.comments} />
        </div>
      );
      //showactions make sure to not show the comment button and like button in an indivisual post
    }
    return (
      <div>
        <div className="post">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <Link to="/feed" className="btn btn-light mb-3">
                  Back to feed
                </Link>
                {PostContents}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Post.propTypes = {
  post: PropType.object.isRequired,
  getPost: PropType.func.isRequired
};
const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  actions
)(Post);
