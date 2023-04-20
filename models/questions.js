module.exports = (sequelize, DataTypes) => {

    const questions = sequelize.define("questions",
    {
        url: {type: DataTypes.STRING, allowNull: false},
        answer: {type: DataTypes.STRING, allowNull: false},
    }
    )

    return questions
}