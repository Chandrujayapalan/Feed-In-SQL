const User = require('../model/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { Op } = require('sequelize')
const register = async (req, res, next) => {
    try {
        let {name, role, email, password } = req.body
        let user = await User.findOne({
            where: {
                email: email
            }
        })
        if (!user) {
            let userData = {
                name: name,
                email: email,
                phone: phone,
                password: await bcrypt.hash(password, 10),
                role: role,
            }
            let users = await User.create(userData)
            return res.json({
                status: 200,
                message: "Users created Succesfully",
                data: users
            })


        } else {
            return res.json({ status: 400, message: "Already exists" })

        }
    }
    catch (error) {
        res.json({
            message: error.message
        })
    }
}

module.exports = {
    register
}