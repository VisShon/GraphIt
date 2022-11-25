const { mergeSchemas } = require('@graphql-tools/schema');
const member = require('./types/member');
const department = require('./types/department');
const memberResolver = require('./resolver/member');
const departmentResolver = require('./resolver/department');

const typedef = [member, department];
const resolvers = [memberResolver, departmentResolver];
const mergedSchema = mergeSchemas(
    {
     typedef:typedef,
     resolver:resolvers   
    }
)
module.exports = {
    schema:mergedSchema
}
  
