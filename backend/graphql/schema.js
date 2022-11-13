const data = require('../sample.json');

const {GraphQLObjectType, 
       GraphQLID, 
       GraphQLString } = require('graphql');


const memberSchemaType = GraphQLObjectType({
    name: 'member',
    fields:{
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        phone: {type: GraphQLString},
    }
});

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        member: {
            type: memberSchemaType,
            args: {id:{type: GraphQLID}}, 
        }
    }
});