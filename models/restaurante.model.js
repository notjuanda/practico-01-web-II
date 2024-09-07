module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Restaurante", {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ubicacion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        imagen: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
};
