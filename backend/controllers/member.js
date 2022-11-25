const Member = require('./member');

const member = async ({ _id },) => {
    return await Member.findOne({ _id });
}

const members = async () => {
    const members = await Member.find({}).populate()
    return members.map(member => ({
    _id: member._id.toString(),
    name: member.name,
    email: member.email,
    phone: member.phone,
    }));
}

const addMember = async ({member}) => {
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
}

const updateMember = async ({_id,member}) => {
    return new Promise((resolve,reject)=>{
        Member.findByIdAndUpdate(_id,{$set:{...member}},{new:true})
              .exec((err, res) => {
            err ? reject(err) : resolve(res);
        });
    });
}

const deleteMember = async ({_id}) => {
    return new Promise((resolve,reject)=>{
        Member.findByIdAndDelete(_id)
              .exec((err, res) => {
            err ? reject(err) : resolve(res);
        });
    });
}

module.exports = {
    member,
    members,
    addMember,
    updateMember,
    deleteMember,
}