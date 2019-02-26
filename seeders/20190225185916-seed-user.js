const uuidV4 = require('uuid/v4')
const moment = require('moment')
const bcrypt = require('bcrypt')
const _ = require('lodash')
const doctorPatientConstants = require('../backend/common/doctors-and-patients-constants')

const saltRounds = 10

const randomIntFromInterval = (min, max) => {
  return Math.floor(
    Math.random() * (max - min + 1) + min
  )
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const doctors = []
    const patients = []

    const generatedUsers = _.times(
      10,
      (index) => {
      
        const generatedUserType = doctorPatientConstants.USER_TYPE[
          Object.keys(doctorPatientConstants.USER_TYPE)[randomIntFromInterval(0, 1)]
        ]

        const generatedUser = {
          id: uuidV4(),
          name: `User ${index+1}`,
          age: `${randomIntFromInterval(1,120)}`,
          mailing_address: `${index+1} Avenue C, New York, NY`,
          phone: `+1${randomIntFromInterval(0,9999999999)}`,
          email: `user${index+1}@doc-pat.co`,
          password_hash: bcrypt.hashSync('demo1234', saltRounds),
          type: generatedUserType,
          created_at: moment().utc().toString(),
          updated_at: moment().utc().toString(),
        }

        if (generatedUser.type === 'doctor') {
          doctors.push(generatedUser.id)
        } else {
          patients.push(generatedUser.id)
        }

        return generatedUser
      }
    )

    const doctorPatients = []
    
    _.each(
      doctors,
      (doctorId) => {
        _.each(
          patients,
          (patientId) => {
            doctorPatients.push({
              created_at: moment().utc().toString(),
              updated_at: moment().utc().toString(),
              doctor: doctorId,
              patient: patientId
            })
          }
        )
      }
    )

    console.log(generatedUsers)
    // console.log(doctorPatients)

    return [
      await queryInterface.bulkInsert(
        'users',
        generatedUsers,
        {}
      ),
      await queryInterface.bulkInsert(
        'doctor_patients',
        doctorPatients,
        {}
      )
    ]
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      'users',
      null,
      {}
    )
  }
}
