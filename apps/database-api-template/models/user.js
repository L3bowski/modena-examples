const userDefinition = (dbConnection, Sequelize) =>
    dbConnection.define('user', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: Sequelize.TEXT
    }, {
        freezeTableName: true
    });

const userAssociations = models => {
    /*
        Define user associations through models.User.belongsToMany, models.User.hasMany, etc.
    */
};

module.exports = {
    userAssociations,
    userDefinition
};