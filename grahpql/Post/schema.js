const schema = `

  type Post {
    id: ID!
    title: String
    content: String
    authorId: ID
    author: Author
  }
  extend type Query {
    posts: [Post]
    post(id: ID!): Post
  }
  extend type Mutation {
    createPost(title: String, content:String!, authorId: ID!): Post
    updatePost(id: ID!, title: String!, content:String!): [Int]
    deletePost(id: ID!): Int
  }
`;

export default schema;