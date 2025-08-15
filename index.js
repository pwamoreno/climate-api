const PORT = 5000

const express = require("express")
const axios = require("axios")
const cheerio = require("cheerio")

const app = express()

// app.use()

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))