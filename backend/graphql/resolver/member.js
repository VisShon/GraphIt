const {member,
  members,
  addMember,
  updateMember,
  deleteMember,} = require('../../controllers/member')

module.exports={
  Query: {
    member: member,
    members:members,
  },
  Mutation: {
    addMember: addMember,
    updateMember: updateMember,
    deleteMember: deleteMember,
  },
};