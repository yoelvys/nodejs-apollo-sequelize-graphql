import models from '../../models';
const resolvers = {
	Query: {
		posts: (parent, args, { db }, info) => {
			return db.post.findAll({ where: args, include: [models.author] })
		},
		post: (parent, { id }, { db }, info) => db.post.find({ where: {id: id}, include: [models.author] })
	},
	Mutation: {
		createPost: (parent, { title, content, authorId }, { db }, info) =>
			db.post.create({
				title: title,
				content: content,
				authorId: authorId
			}),
		updatePost: (parent, { title, content, id }, { db }, info) =>
			db.post.update(
				{
					title: title,
					content: content
				},
				{
					where: {
						id: id
					}
				}
			),
		deletePost: (parent, { id }, { db }, info) =>
			db.post.destroy({
				where: {
					id: id
				}
			})
	}
};

export default resolvers;
