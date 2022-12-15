const Member = require("../models/Member");

const member = async id => {
    const member = await Member.findById(id);
    return {
        ...member._doc,
        _id: member._id,
    }
}

const transform = res => {
    return {
        ...res._doc,
        _id: res._id,
        teamLead: member.bind(this, res.teamLead)
    }
}

exports.transform = transform;