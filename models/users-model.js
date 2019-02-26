/**
 * @fileoverview A model that describes the Students associated with Insights.
 * @author christian.d.battaglia@gmail.com
 */

const doctorPatientConstants = require('../backend/common/doctors-and-patients-constants')

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                field: 'id',
                allowNull: false,
                unique: true,
                validate: {
                    isUUID: 4
                }
            },
            name: {
                type: DataTypes.STRING(255),
                field: 'name',
                allowNull: false
            },
            age: {
                type: DataTypes.SMALLINT,
                field: 'age',
                allowNull: false
            },
            mailingAddress: {
                type: DataTypes.STRING(255),
                field: 'mailing_address',
                allowNull: false
            },
            phone: {
                type: DataTypes.STRING(255),
                field: 'phone',
                allowNull: false
            },
            email: {
                type: DataTypes.STRING(255),
                field: 'email',
                allowNull: false
            },
            passwordHash: {
                type: DataTypes.STRING(255),
                field: 'password_hash',
                allowNull: false
            },
            type: {
                type: DataTypes.ENUM(
                    doctorPatientConstants.USER_TYPE.DOCTOR,
                    doctorPatientConstants.USER_TYPE.PATIENT
                ),
                allowNull: false
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
        },
        {
            tableName: 'users'
        }
    )

    // User.hasMany(User, {
    //     as: 'doctors'
    // })

    // User.hasMany(User, {
    //     as: 'patients'
    // })

    return User
}
