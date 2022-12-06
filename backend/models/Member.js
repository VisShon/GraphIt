const mongoose = require('mongoose');
const {ObjectId} = require('mongodb');


const Schema = mongoose.Schema;
const Member = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  phone: {
    type: String,
    unique: true,
    required: true
  },
});

module.exports = mongoose.model("Member", Member);