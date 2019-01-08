import models from '../../models';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const secreto = 's3cret@2019';
const crearToken = (usuarioLogin, expiresIn) => {
	const { id, usuario, rol } = usuarioLogin;

	const payload = {
		id,
		usuario,
		rol
	};
	return jwt.sign(payload, secreto, { expiresIn });
};

const resolvers = {
	Query: {
		usuarios: (parent, args, { db }, info) => {
			const offset = args.offset || 0;
			const limit = args.first || 10;
			delete args.offset;
			delete args.first;
			return db.usuario.findAll({ where: args, offset, limit });
		},
		usuario: (parent, { id }, { db }, info) => db.usuario.find({ where: { id: id }})
	},
	Mutation: {
		crearUsuario: async (root, { input }, { db }, info) => {
			const { nombre, apellido, email, usuario, password, rol } = input;
			const existeUsuario = await db.usuario.findOne({ where: {usuario : usuario} });

			if (existeUsuario) {
				throw new Error('El usuario ya existe');
			}

			const nuevoUsuario = await db.usuario.create({
				nombre,
				apellido,
				email,
				usuario,
				password,
				rol
			});

			return nuevoUsuario;
		},
		autenticarUsuario: async (root, { usuario, password }, { db }) => {
			const nombreUsuario = await db.usuario.findOne({ where: { usuario: usuario } });
			if (!nombreUsuario) {
				throw new Error('Usuario o password incorrectos');
			}

			const passwordCorrecto = await bcrypt.compare(password, nombreUsuario.password);

			if (!passwordCorrecto) {
				throw new Error('Usuario o password incorrectos');
			}

			return {
				token: crearToken(nombreUsuario, '1hr')
			};
		}
	}
};

export default resolvers;
