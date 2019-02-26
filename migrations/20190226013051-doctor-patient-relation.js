module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [
      await queryInterface.createTable(
        'doctor_patients', {
          created_at: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          updated_at: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          doctor: {
            type: Sequelize.UUID,
            primaryKey: true,
          },
          patient: {
            type: Sequelize.UUID,
            primaryKey: true,
          }
        }
      )
    ]
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('doctor_patients')
  }
};
