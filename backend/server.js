const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv')
const path = require('path')
dotenv.config({ path: __dirname + '/.env' })
const connectDB = require('./config/db')
const port = process.env.PORT || 5000
const {errorHandler} = require('./middleware/errorMiddleware')
const cors = require('cors')

connectDB()

const app = express()

app.use(cors())

app.use(express.json())
app.use('/api/gastos', require('./routes/gastosRoutes'))
app.use('/api/users', require('./routes/usersRoutes'))
app.use('/api/recipes', require('./routes/recipesRoutes'))
app.use('/api/reviews', require('./routes/reviewsRoutes'))
app.use('/api/external', require('./routes/externalRoutes'))
if (process.env.NODE_ENV === 'production') {
	const distPath = path.join(__dirname, '..', 'FRONTNED', 'MasValeProbar', 'dist')
	app.use(express.static(distPath))
	app.get('*', (req, res) => res.sendFile(path.join(distPath, 'index.html')))
}

app.use(errorHandler)

app.listen(port, ()=> console.log(`Servidor iniciado en el puerto ${port}`))