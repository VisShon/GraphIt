const mongoose = require('mongoose');
const {ObjectId} = require('mongodb');


const Schema = mongoose.Schema;

const Department = new Schema({
  teamLead:{
    type: Schema.Types.ObjectId,
    ref: 'Member'
  },
  name: {
    type: String,
    required: true
  },
  lastMilestone: {
    type: String,
    required: true
  },
  status: {
    type: String,
    unique: true,
    required: true
  },
});

module.exports = mongoose.model("Department", Department);