module.exports = (sequelize, DataTypes) => {
    return sequelize.define("HamburguesaComida", {
        usuario_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Usuarios',
                key: 'id'
            },
            allowNull: false
        },
        hamburguesa_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Hamburguesas',
                key: 'id'
            },
            allowNull: false
        }
    });
};
