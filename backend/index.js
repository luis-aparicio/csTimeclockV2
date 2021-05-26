const express = require('express')
const config = require("./config/db")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config();

const app = express()

mongoose.set("useCreateIndex", true);
mongoose.set('useFindAndModify', false);
mongoose
  .connect(process.env.database, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database is connected");
  })
  .catch(err => {
    console.log({ database_error: err });
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
const userRoutes = require("./api/user/route/user");
app.use("/user", userRoutes);

app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));