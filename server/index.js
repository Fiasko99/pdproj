const express = require('express')
const vue = require('vue')
const bodyParser = require('body-parser')
const cors = require('cors')


const app = express()

app.use(bodyParser.json())
app.use(cors())

const posts = require('./routes/api/posts')
const PORT = process.env.PORT || 8080

app.use('/api/posts', posts)

app.listen(PORT, () => console.log(`http://localhost:${PORT}`))