const schema = `
  type Author {
    id: ID
    firstName: String
    lastName: String
    posts: [Post]
  }
  
  extend type Query {
    author(id: ID!): Author
    authors: [Author]
  }
`;

export default schema;