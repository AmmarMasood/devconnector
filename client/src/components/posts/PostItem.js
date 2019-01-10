import React, { Component } from "react";
import PropType from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import * as actions from "../../actions/index";

class PostItem extends Component {
  onDeleteClick = id => {
    this.props.deletePost(id);
  };
  onLikeClick = id => {
    this.props.addLike(id);
  };
  onDislikeClick = id => {
    this.props.removeLike(id);
  };
  //to make the color of the like button green we first create this function
  findUserLike = likes => {
    const { auth } = this.props;
    if (likes.filter(like => like._user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  };
  render() {
    const { post, auth, showActions } = this.props;
    //to learn more about show action go to POST.JS
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={post.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            {showActions ? (
              <span>
                <button
                  onClick={() => this.onLikeClick(post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i
                    className={classnames("fas fa-thumbs-up", {
                      "text-info": this.findUserLike(post.likes)
                    })}
                  />
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>
                <button
                  onClick={() => this.onDislikeClick(post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i className="text-secondary fas fa-thumbs-down" />
                </button>
                {/*this will take us to the single post so we can add like and comment*/}
                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                  Comments
                </Link>
                {post._user === auth.user.id ? (
                  <button
                    type="button"
                    onClick={() => this.onDeleteClick(post._id)}
                    className="btn btn-danger mr-1"
                  >
                    <i className="fas fa-times" />
                  </button>
                ) : null}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
//default props will make the value of a prop default before it changes. In here we use showAction and set its value to default true, which means this this show button, likes in POSTS.JS and will show no actions in POST.JS because we will send showAction props to false from there
PostItem.defaultProps = {
  showActions: true
};
PostItem.propTypes = {
  auth: PropType.object.isRequired,
  post: PropType.object.isRequired,
  deletePost: PropType.func.isRequired,
  addLike: PropType.func.isRequired,
  removeLike: PropType.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  actions
)(PostItem);
