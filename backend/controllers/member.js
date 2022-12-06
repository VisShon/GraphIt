const Member = require('../models/Member');

const member = async (parent,{ _id },) => {
    return await Member.findOne({ _id });
}

const members = async (parent,args) => {
    const members = await Member.find({}).populate()
    return members.map(member => ({
    _id: member._id.toString(),
    name: member.name,
    email: member.email,
    phone: member.phone,
    }));
}

const addMember = async (parent,{member}) => {
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

const updateMember = async (parent,{_id,member}) => {
    return new Promise((resolve,reject)=>{
        Member.findByIdAndUpdate(_id,{$set:{...member}},{new:true})
              .exec((err, res) => {
            err ? reject(err) : resolve(res);
        });
    });
}

const deleteMember = async (parent,{_id}) => {
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