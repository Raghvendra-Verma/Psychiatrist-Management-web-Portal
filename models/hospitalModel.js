const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  id:{
    type:Number,
    required:true
  },
  name: { 
    type: String, 
    required: true
   },
});

module.exports = mongoose.model('Hospital', hospitalSchema);
