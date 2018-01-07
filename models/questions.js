const db = require('./db');
const User = require('./user');
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;

const questionSchema =  sequelize.define('questions', {

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    content : {

        type: Sequelize.TEXT,
        allowNull: false
    },

    upvotes: {

        type: Sequelize.INTEGER,
        min: 0,
        allowNull: true
    },

    user_Id: {

        type: Sequelize.INTEGER,

        references: {

            model : User,
            key : 'id'
        }
    }

});

const Question = module.exports = questionSchema;

//TO ADD A NEW QUESTION

/*module.exports.addQuestion = function (newQuestion, callback) {

    Question.create(newQuestion).then(function (question) {
        // Going back to caller
        return callback(err, question)
    })
};*/

