const uuidV4 = require('uuid/v4')
const moment = require('moment')

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {})
    */
    return queryInterface.bulkInsert(
      'users',
      [
        {
          business_key: uuidV4(),
          name: 'Christian Battaglia',
          age: '25',
          mailing_address: '43 Avenue C, New York, NY 10009',
          phone: '+17705979389',
          email: 'christian.d.battaglia@gmail.com',
          created_at: moment().utc().toString(),
          updated_at: moment().utc().toString()
        }
      ], 
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {})
    */
    return queryInterface.bulkDelete(
      'users',
      null,
      {}
    )
  }
}
