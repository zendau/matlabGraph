require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

const express = require("express")
const app = express()
const db = require('./models')

const cors = require('cors')

const chartRoute = require("./routes/chart.route")

const errorMiddleware = require("./middlewares/error.middleware")

const PORT = process.env.PORT || 3000


app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL
}))

app.use("/chart", chartRoute)

app.use(errorMiddleware)

async function start() {
  try {


    await db.sequelize.sync();

    console.log('Connection has been established successfully.');

    app.listen(PORT, () => {
      console.log(`server started on http://localhost:${PORT}`)
    })
  } catch (e) {
    console.error('Unable to connect to the database:', e);
  }
}

start()