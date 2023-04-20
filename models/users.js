module.exports = (sequelize, DataTypes) => {

    const users = sequelize.define("users",
    {
        username: {type: DataTypes.STRING, allowNull: false},
        password: {type: DataTypes.STRING, allowNull: false},
        salt: {type: DataTypes.STRING, allowNull: false}
    }
    )

    users.associate = (models) => {
        users.hasMany(models.questionsets, {onDelete: "cascade"})
    }

    return users
}