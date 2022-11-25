const Member = require('./memberResolver');

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
    addMember: async ({member}) => {
      const newMembers = await new Member({
        name: member.name,
        email: member.email,
        phone: member.phone,
      });

      return new Promise((resolve, reject) => {
        newMembers.save((err, res) => {
              err ? reject(err) : resolve(res);
          });
      });
    },
    updateMember: async ({_id,member}) => {
      return new Promise((resolve,reject)=>{
          Member.findByIdAndUpdate(_id,{$set:{...member}},{new:true})
                .exec((err, res) => {
              err ? reject(err) : resolve(res);
          });
      });
    },
    deleteMember: async ({_id}) => {
      return new Promise((resolve,reject)=>{
          Member.findByIdAndDelete(_id)
                .exec((err, res) => {
              err ? reject(err) : resolve(res);
          });
      });
    },
  },
};
