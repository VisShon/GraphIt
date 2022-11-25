const mongoose = require('mongoose');
const {ObjectID} = require('mongodb');


const Schema = mongoose.Schema;
const DepartmentScehma = new Schema({
  teamLead:{
    type: Schema.type.ObjectID,
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

ObjectID.prototype.valueOf = function(){
    return this.toString();
}

export default mongoose.model("Department", DepartmentScehma);