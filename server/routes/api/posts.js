const express = require('express')
const Sequelize = require("sequelize");
const sequelize = new Sequelize("projdb", "root", "", {
  dialect: "mysql",
  host: "localhost"
});

const router = express.Router()

// gets
router.get('/', (req, res) => {
    res.send('hello')
})

// posts


// deletes

module.exports = router