const { mergeSchemas } = require('@graphql-tools/schema');
const member = require('./types/member');
const department = require('./types/department');

const typedef = [member, department];
const mergedSchema = mergeSchemas(
    {typedef:typedef,
     resolver:   
    }
)
module.exports = {
    schema:mergedSchema
}
  
