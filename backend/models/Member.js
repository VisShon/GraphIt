const mongoose = require('mongoose');
const {ObjectID} = require('mongodb');


const Schema = mongoose.Schema;
const MemberScehma = new Schema({
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

ObjectID.prototype.valueOf = function(){
  return this.toString();
}

export default mongoose.model("Member", MemberScehma);