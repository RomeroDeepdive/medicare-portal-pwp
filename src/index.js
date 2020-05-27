require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const mailgun = require('mailgun-js')
const bodyParser = require('body-parser')
const {check, validationResult} = require("express-validator")

// initializing the express application
const app = express()

// project wide middelware declarations for express
app.use(morgan('dev'))
app.use(bodyParser).urlencoded({extended:false}))
app.use(bodyParser.json())

console.log(process.env)

const indexRoute = express.Router()

const requestValidation = [
	[
		check("email", "A Valid Email is required").isEmail().normalizeEmail(),
		check('name', "A Name is required to send an email").not().isEmpty().trim(),escape(),
		check('subject',).optional().trim().escape(),
		check('message', "A message is required to send email").not().isEmpty().trim(),escape().isLength({max:2000})
	],
indexRoute.route('/apis')
	.get((request, response) => {
		return response.json('Hello')



})
	.post(requestValidation, (request, response) => {

		const domain = process.env.MAILGUN_DOMAIN
		const mg = mailgun({apiKey: process.env.MAILGUN_API_KEY, domain: domain});

		const {email, subject, name, message} = request.body

const mailgunData = {
		to: process.env.MAIL_RECIPIENT,
		from: `Mailgun Sandbox <postmaster@${domain}>`,
		subject: `${name} - ${email}: ${subject}`,
		text: message
	}

	mg.messages().send(mailgunData, (error) =>{
		return response.json("error sending email through email handler please try again later")
	})



		const errors = validationResult(request)

			if(!errors.isEmpty()) {
				const currentError = errors.array()[0]
				return response.json('bad request: ${currentError.msg}')
			}
		//this line below must be commented out before pwp has been hosted using docker
		response.append('Access-Control-Allow-Origin', ['*']);
		console.log(request.body)
		return response.send(buffer.form('div class='alert-success''))
	})

app.use(indexRoute)

app.listen(4200, () => {console.log("The server has started")} )
