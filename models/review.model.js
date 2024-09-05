module.exports = (sequelize, Sequelize) => {
    const Review = sequelize.define("review", {
        puntuacion: {
            type: Sequelize.INTEGER,
            allowNull: true,
            validate: {
                min: 1,
                max: 5
            }
        },
        comentario: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        hamburguesaId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'hamburguesas', 
                key: 'id'
            }
        },
        usuarioId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'usuarios',
                key: 'id'
            }
        },
        comioHamburguesa: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false 
        }
    });

    return Review;
};
