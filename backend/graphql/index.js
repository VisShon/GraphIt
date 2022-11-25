const { mergeSchemas } = require('@graphql-tools/schema');
const member = require('./types/member');
const department = require('./types/department');
const memberResolver = require('./resolver/memberResolver');
const departmentResolver = require('./resolver/departmentResolver');

const typedef = [member, department];
const resolvers = [memberResolver, departmentResolver];
const mergedSchema = mergeSchemas(
    {typedef:typedef,
     resolver:resolvers   
    }
)
module.exports = {
    schema:mergedSchema
}
  
