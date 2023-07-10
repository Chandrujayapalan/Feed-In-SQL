const express = require('express')
const morgan = require('morgan')
const bodyparser = require('body-parser')
// const userController = require('./routes/productRoutes')

const app = express()
// app.use(cors())
app.use(morgan('dev'))
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "*");
	next();
});

const PORT = process.env.PORT || 9000
app.listen(PORT, () => {
    console.log(`server is running ${PORT}`)
 
})
app.get("/", (req, res) => {
		res.status(200).send({
			status: 200,
			message: 'Api Running!'
		})
	});
// app.use('/api', userController)