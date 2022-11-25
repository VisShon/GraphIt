const Member = require('./memberResolver');
const Department = require('./departmentResolver');

export default {
    Query: {
        department: async ({_id}) => {
            return await Department.findOne({_id: _id});
        },
        departments: async () => {
            const data = await Department.find({}).populate();
            return data.map(department => ({
                _id: department._id.toString(),
                teamLead: department.teamLead,
                name: department.name,
                lastMilestone: department.lastMilestone,
                status: department.status,
          }));
        }
    },
    Mutation: {
        addDepartment: async ({department}) => {
            const newDepartment = await new Department({
                name: department.name,
                status: department.status,
            });

            return new Promise((resolve, reject) => {
                newDepartment.save((err, res) => {
                    err ? reject(err) : resolve(res);
                });
            });
        },
        updateDepartment: async ({_id,department}) => {
            return new Promise((resolve,reject)=>{
                Department.findByIdAndUpdate(_id,{$set:{...department}},{new:true})
                          .exec((err, res) => {
                    err ? reject(err) : resolve(res);
                });
            });
        },
        deleteDepartment: async ({_id}) => {
            return new Promise((resolve,reject)=>{
                Department.findByIdAndDelete(_id)
                          .exec((err, res) => {
                    err ? reject(err) : resolve(res);
                });
            });
        },
        changeTeamLead:async ({_id,teamLead}) => {
            return new Promise((resolve,reject)=>{
                Department.findByIdAndUpdate(_id,{$set:{teamLead:teamLead}},{new:true})
                      .exec((err, res) => {
                        err? reject(err) : resolve(res);
                });
            });
        },
    },
    Department:{
        teamLead: async({_id}) => {
            return Member.findOne({_id:_id}).exec()
        }
    }
};
