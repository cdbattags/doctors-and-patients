module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      "business_key": {
        type: Sequelize.UUID
      },
      name: {
        type: Sequelize.STRING(255)
      },
      age: {
        type: Sequelize.SMALLINT
      },
      "mailing_address": {
        type: Sequelize.STRING(255)
      },
      phone: {
        type: Sequelize.STRING(255)
      },
      email: {
        type: Sequelize.STRING(255)
      },
      "created_at": {
        allowNull: false,
        type: Sequelize.DATE
      },
      "updated_at": {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};