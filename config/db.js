// require('dotenv').config()
// const {Sequelize} = require('sequelize')

// const sequelize = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASSWORD,
//     {
//         host:process.env.DB_HOST,
//         port:process.env.DB_PORT,
//         dialect: process.env.DB_DIALECT,
//         logging:true
//     }
// );

// sequelize.authenticate()
//    .then(() => console.log('✅ PostgreSQL connected'))
//    .catch(err => console.log('❌ Connection error:', err));

// module.exports = sequelize;


require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  logging: false,

  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Render needs this
    },
  },
});

sequelize
  .authenticate()
  .then(() => console.log("✅ PostgreSQL connected successfully"))
  .catch((err) => console.error("❌ Connection error:", err));

module.exports = sequelize;

