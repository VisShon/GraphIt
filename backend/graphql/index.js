const {makeExecutableSchema } = require('@graphql-tools/schema');
const { loadFilesSync } = require('@graphql-tools/load-files');
const { mergeTypeDefs } = require('@graphql-tools/merge');
const memberResolver = require('./resolver/member');
const departmentResolver = require('./resolver/department');
const path = require('path');

const resolvers = [memberResolver, departmentResolver];
const typesArray = loadFilesSync(path.join(__dirname, './schema'));

const schema = makeExecutableSchema({ 
    typeDefs: mergeTypeDefs(typesArray, { all: true }),
    resolvers 
});

module.exports = {
    schema:schema
}
  
