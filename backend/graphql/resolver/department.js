const {department,
    departments,
    addDepartment,
    updateDepartment,
    deleteDepartment,
    changeTeamLead,
    teamLead,} = require('../../controllers/department')

export default {
    Query: {
        department: department,
        departments: departments
    },
    Mutation: {
        addDepartment: addDepartment,
        updateDepartment: updateDepartment,
        deleteDepartment: deleteDepartment,
        changeTeamLead: changeTeamLead,
    },
    Department:{
        teamLead: teamLead,
    }
};
