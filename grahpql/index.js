const fs = require('fs');
const path = require('path');
import { makeExecutableSchema } from 'graphql-tools';
import { merge } from 'lodash';

// set initial Query type.
// Is empty because is not possible define types with no code inside.
const rootQuery = `
 type Query {
   _empty: String
 }
`;

// set initial Mutation type
// Is empty because is not possible define types with no code inside.
const rootMutation = `
 type Mutation {
   _empty: String
 }
`;

const typeDefs = [ rootMutation, rootQuery ];

let resolvers = {};

fs.readdirSync(__dirname).filter((dir) => dir.indexOf('.') < 0).forEach((dir) => {
	const subdir = __dirname + '/' + dir;
	fs.readdirSync(subdir).forEach((file) => {
		if (file.indexOf('.') > 0) {
      const importFile = require(path.join(subdir, file)).default;
			if (typeof importFile === 'string') {
				typeDefs.push(importFile);
			} else {
				resolvers = merge(resolvers, importFile);
			}
		}
	});
});

// glues all schemas and resolvers
const schema = makeExecutableSchema({
	typeDefs: typeDefs,
  resolvers: resolvers,
  
});

export default schema;
