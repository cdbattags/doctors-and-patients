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
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true
            },
            businessKey: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                field: 'business_key',
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
            indexes: [
                {
                    fields: ['business_key'],
                    name: 'business_key_index',
                    unique: true
                }
            ],
            tableName: 'users'
        })

    return User
}
