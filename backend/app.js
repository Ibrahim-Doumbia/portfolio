const express = require("express")
const dotenv = require("dotenv").config()
const cors = require("cors")
const portfolioRouter = require("./routes/portfolio.route")

const app = express()

const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5500"
]

app.use(cors({
  origin: function(origin, callback){
    // autoriser les requêtes sans origine (ex: Postman)
    if(!origin) return callback(null, true)
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = "L'origine n'est pas autorisée par CORS"
      return callback(new Error(msg), false)
    }
    return callback(null, true)
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}))

app.use('/api/portfolio', portfolioRouter)

app.listen(port, ()=>{
    console.log(`Le serveur est écouté sur http://localhost:${port}`)
})