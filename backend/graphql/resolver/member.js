const Member = require('../resolver/member');
const Department = require('../resolver/department');

export default {
  Query: {
    member: async ({ _id },) => {
        return await Member.findOne({ _id });
    },
    members: async () => {
        const members = await Member.find({}).populate()
        return members.map(member => ({
        _id: member._id.toString(),
        name: member.name,
        email: member.email,
        phone: member.phone,
        }));
    }
  },
  Mutation: {
    addMember:'',
    updateMember:'',
    deleteMember:'',
  },
};
