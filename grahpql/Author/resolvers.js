import models from '../../models';
const resolvers = {
  Query: {
    authors: (parent, args, { db }, info) => {
      const offset = args.offset || 0;
      const limit = args.first || 10;
      delete args.offset;
      delete args.first;
      return db.author.findAll({ where: args, include: [models.post], offset, limit });
    },
    author: (parent,  {id} , { db }, info) => db.author.find({ where: {id: id}, include: [models.post] })
  }
};
export default resolvers ;

/*
const resolvers = {
	Author: {
		posts: (parent, args, context, info) => parent.getPosts()
	},
	Query: {
		authors: (parent, args, { db }, info) => {
			return db.author.findAll();
		},
		author: (parent, { id }, { db }, info) => db.author.findById(id)
	}
};

export default resolvers;
*/