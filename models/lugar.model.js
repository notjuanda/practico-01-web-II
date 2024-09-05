module.exports = (sequelize, Sequelize) => {
    const Lugar = sequelize.define("lugar", {
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        direccion: {
            type: Sequelize.STRING,
            allowNull: false
        },
        foto: {
            type: Sequelize.STRING,
            allowNull: true
        },
        usuarioId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'usuarios',
                key: 'id'
            }
        }
    }, {
        tableName: 'lugares'
    });

    return Lugar;
};
