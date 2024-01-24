const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true
 },
  address: { 
    type: String, 
    required: true, 
    minlength: 10 
},
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => /\S+@\S+\.\S+/.test(value),
      message: "Invalid email",
    },
  },
  phoneNumber: { 
    type: String, 
    required: true, 
    minlength: 10 ,
},
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 15,
    validate: {
      validator: (value) =>
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/.test(value),
      message: "Invalid password",
    },
  },
  photo: { 
    type: String, 
    required: true
 },
});

module.exports = mongoose.model("Patient", patientSchema);
