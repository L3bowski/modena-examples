const { userDefinition, userAssociations } = require('./user');

module.exports = (dbConnection, Sequelize) => {

    const models = {
        User: userDefinition(dbConnection, Sequelize)
    };

    userAssociations(models);

    /*
        Execute the rest of the database models definitions
    */

    return models;
};