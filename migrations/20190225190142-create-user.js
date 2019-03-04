const doctorPatientConstants = require('../backend/common/doctors-and-patients-constants')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [
      await queryInterface.createTable('users', {
        id: {
          type: Sequelize.UUID,
          allowNull: false,
          autoIncrement: false,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        name: {
          type: Sequelize.STRING(255)
        },
        age: {
          type: Sequelize.SMALLINT
        },
        'mailing_address': {
          type: Sequelize.STRING(255)
        },
        phone: {
          type: Sequelize.STRING(255)
        },
        email: {
          type: Sequelize.STRING(255)
        },
        'password_hash': {
          type: Sequelize.STRING(255)
        },
        type: {
          allowNull: false,
          type: Sequelize.ENUM(
            doctorPatientConstants.USER_TYPE.DOCTOR,
            doctorPatientConstants.USER_TYPE.PATIENT
          )
        },
        'created_at': {
          allowNull: false,
          type: Sequelize.DATE
        },
        'updated_at': {
          allowNull: false,
          type: Sequelize.DATE
        }
      })
    ]
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users')
  }
};