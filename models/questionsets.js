module.exports = (sequelize, DataTypes) => {

    const questionsets = sequelize.define("questionsets",
    {
        name: {type: DataTypes.STRING, allowNull: false},
    }
    )

    questionsets.associate = (models) => {
        questionsets.hasMany(models.questions, {onDelete: "cascade"})
    }

    return questionsets
}