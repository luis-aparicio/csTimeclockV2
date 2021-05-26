const express = require('express')
const config = require("./config/db")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require('cors')


const app = express()
const port = 3000

mongoose.set("useCreateIndex", true);
mongoose.set('useFindAndModify', false);
mongoose
  .connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true })
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

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})