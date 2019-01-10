const express = require("express");
require("./models/User.js");
require("./models/Post.js");
require("./models/Profile.js");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const app = express();

//body parser middlware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//mongo config
const db = require("./config/keys").mongoURI;

//connecting mongoose  to mongoose
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("Coonected to mongoDB"))
  .catch(err => console.log(err));

//initializing passport
app.use(passport.initialize());
require("./config/passport")(passport);
//routes
require("./routes/api/users")(app);
require("./routes/api/profile")(app);
require("./routes/api/posts")(app);

//calling the port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port: ${port}`));
