module.exports = function (sequelize, DataTypes) {

    const questions = sequelize.define('questions', {

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        content: {

            type: DataTypes.STRING,
            allowNull: false
        },

        upvotes: {

            type: DataTypes.INTEGER,
            min: 0,
            allowNull: true
        },

        answered: {

            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: true
        }

    });

    questions.addQuestion = function (newQuestion, callback) {

        questions.create(newQuestion).then(function (question) {

            return callback(null, question);
        })

    };

    questions.getQuestionById = function (id, callback) {

        questions.find({
            where:{
                id: id
            }
        }).then(function (question){
            return callback(null, question);
        }).catch(function (err){
            return callback(err,null);
        })

    };


    return questions;
};
