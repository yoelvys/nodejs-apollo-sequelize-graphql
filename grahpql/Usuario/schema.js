const schema = `
type Usuario{
    id:ID
    nombre:String
    apellido:String
    email: String
    usuario: String
    rol: Rol
}

enum Rol{
    ADMINISTRADOR
    USUARIO
}
type Token {
	token: String
}

input UsuarioInput{
    nombre:String!
    apellido:String!
    email: String!
    usuario: String!
    password: String!
    rol: Rol!
}

extend type Query{
    usuario(id:ID): Usuario
    usuarios: [Usuario]
    usuarioAutenticado: Usuario
}
extend type Mutation{
    crearUsuario(input:UsuarioInput): Usuario
    autenticarUsuario(usuario: String!, password: String!): Token
}

`;
export default schema;
