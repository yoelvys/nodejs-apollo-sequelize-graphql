# nodejs-apollo-sequelize-graphql
Proyecto inicial con registro y login, tiene estructurado los resolvers y schema en archivos separados por entidades.

### Para poner en funcionamiento el proyecto deben seguir los siguientes pasos:
```
git clone https://github.com/yoelvys/nodejs-apollo-sequelize-graphql.git
npm install
```
Configurar el archivo config/config.json con los datos para el acceso a la bd
```
{
  "development": {
    "username": "root",
    "password": "planet",
    "database": "facturacion_demo",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

```

Existen dos entidades Author y Post que solo son incluidas en el proyecto con fines de que se pueda ver como el sistema automaticamente carga los schema y resolvers de cada carpeta, no es importante el nombre del archivo solo deben ser .js

Si queremos que se nos llene la bd con datos genericos en las tablas post y author podemos quitar el comentario al codigo que se encuentra en la index.js quedando de la siguiente manera

```
db.sequelize.sync().then(() => {
	// populate author table with dummy data
	db.author.bulkCreate(
		times(10, () => ({
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName()
		}))
	);
	// populate post table with dummy data
	db.post.bulkCreate(
		times(10, () => ({
			title: faker.lorem.sentence(),
			content: faker.lorem.paragraph(),
			authorId: random(1, 10)
		}))
	);

	app.listen({ port: 8000 }, () =>
		console.log(`El servidor esta corriendo http://localhost:8000${server.graphqlPath}`)
	);
});
```

Se crearon los mutation para el registro de usuario y para el login este ultimo nos devuelve el tocken, para que pueda ser probado se debe ejecutar 

```
   npm start
   Ingresar a http://localhost:8000/graphql
```

Podemos ejecutar las siguientes mutataciones

```
mutation crearUsuario($input: UsuarioInput){
  crearUsuario(input: $input){
    nombre
    apellido
    rol
  }
}  
  En variable creamos el input, los datos pueden ser cambiados y con este usuario y password haremos la autenticacion, revisar siempre que en la base en la tabla usuario se haya guardado el campo password encriptado 
  
  {
  "input": {
    "nombre": "Nombre",
    "apellido": "Apellidos",
    "email": "a@gmail.com",
    "password": "1234",
    "usuario": "prueba",
    "rol": "ADMINISTRADOR"
  }
}

mutation autenticarUsuario($usuario: String!, $password: String!){
  autenticarUsuario(usuario: $usuario, password: $password){
    token
  }
}
En variables pondremos el usario y el password anteriormente utilizado en la creacion del usuario
{
  "usuario": "prueba",
  "password": "1234"
}

En la respuesta obtendremos el token que en el front end autilizaremos en cada peticion
```  
Otro aspecto importante a tener en cuenta es como hacer que sequelize haga una sola consulta cuando por ejemplo queremos obtener los Post con su Author incluido, en muchos ejemplos lo hacen de otra forma y sequelize hace una consulta por cada Post a la base de datos para obtener el Author lo que no es correcto. Para solucionar esto en el findALL o findOne se pone lo siguiente
```
import models from '../../models';
const resolvers = {
  Query: {
    authors: (parent, args, { db }, info) => {
      return db.author.findAll({ where: args, include: [models.post]});
    },
    author: (parent,  {id} , { db }, info) => db.author.find({ where: {id: id}, include: [models.post] })
  }
};
export default resolvers ;
```
Como se puede ver se utiliza la opcion include de sequelize para que el propio sequelize haga una sola consulta.
