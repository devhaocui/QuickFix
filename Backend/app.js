//app.js
const express = require('express')
const cors = require('cors')


const app = express()
app.use(cors())
app.use(express.json())

const userRoutes = require('./src/routes/userRoutes')
app.use('/api', userRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`server running on ${PORT}`)
})
