const express = require("express");
const bodyParser = require("body-parser");
const colors = require('colors');
require('dotenv').config();
const patientRoutes = require("./routes/patientRoutes");
const hospitalRoutes = require("./routes/hospitalRoutes");
const psychiatristRoutes = require("./routes/psychiatristRoutes");
const { connectToMongoDB } = require("./config/db");

const app = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Routes
app.use("/routes", patientRoutes);
app.use("/routes", hospitalRoutes);
app.use("/routes",psychiatristRoutes);

//Database connection
connectToMongoDB("mongodb://127.0.0.1/Patient_Register", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB".bgYellow))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.bgMagenta);
});
