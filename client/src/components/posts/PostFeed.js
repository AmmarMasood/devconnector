import React from "react";
import PropType from "prop-types";
import PostItem from "./PostItem";

const PostFeed = ({ posts }) => {
  return posts.map(post => <PostItem key={post._id} post={post} />);
};

PostFeed.propTypes = {
  posts: PropType.array.isRequired
};

export default PostFeed;
