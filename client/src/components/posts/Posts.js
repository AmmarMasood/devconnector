import React, { Component } from "react";
import { connect } from "react-redux";
import PropType from "prop-types";
import Spinner from "../common/Spinner";
import PostForm from "./PostForm";
import PostFeed from "./PostFeed";
import * as actions from "../../actions/index";

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }
  render() {
    const { posts, loading } = this.props.post;
    let PostContent;
    if (posts === null || loading === true) {
      PostContent = <Spinner />;
    } else {
      PostContent = <PostFeed posts={posts} />;
    }
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
              {PostContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Posts.propTypes = {
  post: PropType.object.isRequired,
  getPosts: PropType.func.isRequired
};
const mapStateToProps = state => ({
  post: state.post
});
export default connect(
  mapStateToProps,
  actions
)(Posts);
