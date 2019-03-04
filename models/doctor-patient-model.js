/**
 * @fileoverview A model that describes the Students associated with Insights.
 * @author christian.d.battaglia@gmail.com
 */

const doctorPatientConstants = require('../backend/common/doctors-and-patients-constants')

module.exports = (sequelize, DataTypes) => {
    const DoctorPatient = sequelize.define(
        'DoctorPatient', {
            doctorId: {
                primaryKey: true,
                type: DataTypes.UUID,
                field: 'doctor',
                allowNull: false,
                validate: {
                    isUUID: 4
                }
            },
            patientId: {
                primaryKey: true,
                type: DataTypes.UUID,
                field: 'patient',
                allowNull: false,
                validate: {
                    isUUID: 4
                }
            },
            createdAt: {
                type: DataTypes.DATE,
                field: 'created_at',
                defaultValue: DataTypes.NOW
            },
            updatedAt: {
                type: DataTypes.DATE,
                field: 'updated_at',
                defaultValue: DataTypes.NOW
            }
        }, {
            tableName: 'doctor_patients'
        }
    )

    return DoctorPatient
}
