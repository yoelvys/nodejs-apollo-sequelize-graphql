import express from 'express';
//para carga automatica
import faker from "faker";
import times from "lodash.times";
import random from "lodash.random";

//graphql
import { ApolloServer } from 'apollo-server-express';
import schema from './grahpql';
import jwt from 'jsonwebtoken';


//BD
import db from './models';

const app = express();

const server = new ApolloServer({
	schema,
	//validar token peticion
	context: {
		db
	}
});

server.applyMiddleware({ app });

db.sequelize.sync().then(() => {
	//// populate author table with dummy data
	//db.author.bulkCreate(
	//	times(10, () => ({
	//		firstName: faker.name.firstName(),
	//		lastName: faker.name.lastName()
	//	}))
	//);
	//// populate post table with dummy data
	//db.post.bulkCreate(
	//	times(10, () => ({
	//		title: faker.lorem.sentence(),
	//		content: faker.lorem.paragraph(),
	//		authorId: random(1, 10)
	//	}))
	//);

	app.listen({ port: 8000 }, () =>
		console.log(`El servidor esta corriendo http://localhost:8000${server.graphqlPath}`)
	);
});
