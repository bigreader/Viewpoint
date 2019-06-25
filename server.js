const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(require('./routes'));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/viewpoint").then(() => {
  console.log('database connected');
});

app.listen(PORT, function () {
  console.log('api server running on ' + PORT);
});
