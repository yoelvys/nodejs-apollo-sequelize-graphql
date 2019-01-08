import bcrypt from 'bcrypt';
export default (sequelize, DataTypes) => {
	const Usuario = sequelize.define(
		'usuario',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			nombre: DataTypes.STRING,
			apellido: DataTypes.STRING,
			email: DataTypes.STRING,
			usuario: DataTypes.STRING,
			password: DataTypes.STRING,
			rol: DataTypes.STRING,
		},
		{
			freezeTableName: true
		}
	);

	Usuario.beforeCreate( async(user, options) => {
		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(user.password, salt);
	});
	return Usuario;
};
