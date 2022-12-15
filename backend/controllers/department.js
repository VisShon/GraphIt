const Department = require('../models/Department');
const Member = require('../models/Member');
const { transform } = require("./merge");

const department = async (parent,{_id}) => {
    return await Department.findById(_id).exec();
};

const departments = async (parent,args) => {
    const data = await Department.find({})
                                 .populate()
                                 .exec();
    return data.map(department => ({
        _id: department._id.toString(),
        teamLead: department.teamLead,
        name: department.name,
        lastMilestone: department.lastMilestone,
        status: department.status,
  })  
)};

const addDepartment =  async (parent,{department}) => {
    const newDepartment = await new Department({
        name: department.name,
        status: department.status,
        lastMilestone: department.lastMilestone,
        teamLead: department.teamLead,
    });

    const res = new Promise((resolve, reject) => {
        newDepartment.save((err, res) => {
            err ? reject(err) : resolve(res);
        });
    });

    const data = transform(res);
    return data;
}

const updateDepartment =  async (parent,{_id,department}) => {
    return new Promise((resolve,reject)=>{
        Department.findByIdAndUpdate(_id,{$set:{...department}},{new:true})
                  .exec((err, res) => {
            err ? reject(err) : resolve(res);
        });
    });
}

const deleteDepartment =  async (parent,{_id}) => {
    return new Promise((resolve,reject)=>{
        Department.findByIdAndDelete(_id)
                  .exec((err, res) => {
            err ? reject(err) : resolve(res);
        });
    });
}

const changeTeamLead = async (parent,{_id,teamLead}) => {
    return new Promise((resolve,reject)=>{
        Department.findByIdAndUpdate(_id,{$set:{teamLead:teamLead}},{new:true})
              .exec((err, res) => {
                err? reject(err) : resolve(res);
        });
    });
}

const teamLead = async({teamLead},args) => {
    return await Member.findById(teamLead);
}

module.exports ={
    department,
    departments,
    addDepartment,
    updateDepartment,
    deleteDepartment,
    changeTeamLead,
    teamLead,
}