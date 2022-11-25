const {member,
  members,
  addMember,
  updateMember,
  deleteMember,} = require('../../controllers/member')

export default {
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