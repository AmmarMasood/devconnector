const express = require("express");
const mongoose = require("mongoose");

const app = express();
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

app.get("/", (req, res) => {
  res.send("hey!");
});

//routes
require("./routes/api/users")(app);
require("./routes/api/profile")(app);
require("./routes/api/posts")(app);

//calling the port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port: ${port}`));
