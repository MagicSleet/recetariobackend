const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv')
dotenv.config({ path: __dirname + '/.env' })
const connectDB = require('./config/db')
const port = process.env.PORT || 5000
const {errorHandler} = require('./middleware/errorMiddleware')
const cors = require('cors')

connectDB()

const app = express()

/*
const corsOptions = {
    origin: 'https//midominio.com',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
*/

app.use(cors())

app.use(express.json())

app.use('/api/gastos', require('./routes/gastosRoutes'))
app.use('/api/users', require('./routes/usersRoutes'))
app.use('/api/recipes', require('./routes/recipesRoutes'))
app.use('/api/reviews', require('./routes/reviewsRoutes'))

app.use(errorHandler)

app.listen(port, ()=> console.log(`Servidor iniciado en el puerto ${port}`))