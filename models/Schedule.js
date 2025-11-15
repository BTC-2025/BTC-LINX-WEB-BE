const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Schedule = sequelize.define("Schedule",{
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    companyname:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    phonenum:{
        type:DataTypes.STRING,
        allowNull:false
    },
    message:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

module.exports = Schedule