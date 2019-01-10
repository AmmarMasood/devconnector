const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//creating schema
const PostSchema = new Schema({
  _user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  text: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  name: {
    type: String
  },
  comments: [
    {
      text: { type: String, required: true },
      name: { type: String },
      _user: { type: Schema.Types.ObjectId, ref: "users" },
      date: { type: Date, default: Date.now },
      avatar: { type: String }
    }
  ],
  likes: [
    {
      _user: { type: Schema.Types.ObjectId, ref: "users" }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

mongoose.model("posts", PostSchema);
