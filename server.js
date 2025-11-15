const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const sequelize = require('./config/db.js')

const scheduleRoutes = require('./routes/scheduleRoutes.js')

dotenv.config()

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors())

app.use('/api/schedule',scheduleRoutes)

const PORT = process.env.PORT || 5000;

// Sync DB and start server
sequelize
  .sync({alter:false})
  .then(() => {

    console.log("✅ PostgreSQL Connected & Synced via Sequelize");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ DB Connection Failed:", err));
