const jwt = require("jsonwebtoken");
const { userMaster } = require('../models');

module.exports = {
    isAdmin: async (req, res, next) => {
        try {
            let token = req.headers["x-access-token"] || req.headers["token"] || req.headers["authorization"];
            if (!token) {

            }
            else {
                token = token.split(" ")
                if (token.length == 1) {
                    token = token[0]
                } else {
                    token = token[1]
                }

            }
            if (token) {
                return jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
                    if (err) {
                        return next(UTILS.unAuthorized(message[401]))
                    } else {
                        try {
                            let user = await userMaster.findOne({
                                where :{

                                }
                            })
                        
                            if (!user || user.userType != USER_ROLES.ADMIN_R) {
                                return next(UTILS.unAuthorized(message[401]))
                            }
                            req.user = { ...user, ...payload }; // payload
                            next();
                        } catch (error) {
                            next(error)
                        }
                    }
                });
            }
            return next(UTILS.unAuthorized(message[401]))
        } catch (error) {
            return next(error)
        }
    },
    isSuperAdmin: async (req, res, next) => {
        try {
            const { userType } = req.user;

            if (userType != USER_ROLES.ADMIN_R) {
                return next(UTILS.unAuthorized(message[401]))
            }
            next()
        } catch (error) {
            return next(error)
        }
    },
    isGuest: async (req, res, next) => {
        let token = req.headers["x-access-token"] || req.headers["token"] || req.headers["authorization"];
        if (!token) {
            return next(UTILS.unAuthorized(message[401]))
        }
        else {
            token = token.split(" ")
            if (token.length == 1) {
                token = token[0]
            } else {
                token = token[1]
            }

        }
        if (token) {
            return jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
                if (err) {
                    return res
                        .status(status.HTTP_UNAUTHORIZED)
                        .json({
                            status: status.HTTP_UNAUTHORIZED,
                            message: message[401],
                            data: {}
                        });
                } else {
                    let getUserInfo = {}
                    if (payload.type && payload.type !== GUEST_USER.userType) {
                        getUserInfo = await userMaster.findOne({
                            where: {
                                id: payload.id
                            },
                            raw: true
                        });
                    } else {
                        console.log(getUserInfo);
                        getUserInfo = GUEST_USER.id === payload.id && GUEST_USER.userType === payload.type && GUEST_USER || false
                    }

                    if (!getUserInfo || (getUserInfo && getUserInfo.status !== STATUS.ACTIVE)) {
                        return res
                            .status(status.HTTP_UNAUTHORIZED)
                            .json({
                                status: status.HTTP_UNAUTHORIZED,
                                message: message[401],
                                data: {}
                            });
                    }

                    req.user = getUserInfo; // payload
                    next();
                }
            });
        }
        return res.status(status.HTTP_UNAUTHORIZED).json({
            status: status.HTTP_UNAUTHORIZED,
            message: message[401],
            data: {}
        });
    },
    verifyToken: async (req, res, next) => {
        let token = req.headers["x-access-token"] || req.headers["authorization"];
        if (token) {
            return jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
                if (err) {
                    return next(UTILS.unAuthorized(message[401]))
                } else {
                    let user = await isUser(payload.id)
                    user = JSON.parse(user)
                    if (!user || user.status === STATUS.INACTIVE || user.status === STATUS.REMOVED) {
                        return next(UTILS.unAuthorized(message[401]))
                    }
                    req.user = { ...payload, ...user }; // payload
                    next();
                }
            });
        }
        return next(UTILS.unAuthorized(message[401]))

    },
    verifyAppToken: async (req, res, next) => {

        let token = req.headers["x-access-token"] || req.headers["authorization"];

        if (!token) {
            next();
        }
        else {
            token = token.split(" ")
            if (token.length == 1) {
                token = token[0]
            } else {
                token = token[1]
            }

        }
        if (token) {

            return jwt.verify(token, process.env.JWT_SIGNUP_SECRET, async (err, payload) => {
                if (err) {
                    return next(UTILS.unAuthorized(message[401]))
                } else {
                    let getUserInfo = await userMaster.findOne({
                        where: {
                            email: payload.email
                        },
                        raw: true
                    });

                    if (!getUserInfo) {
                        return next(UTILS.unAuthorized(message[401]))
                    }
                    req.user = getUserInfo; // payload
                    next();
                }
            });
        }
        // return next(UTILS.unAuthorized(message[401]))

    },
    verifySecret: async (req, res, next) => {
        try {
            let token = req.headers["x-access-token"];
            if (token) {
                return jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
                    if (err) {
                        return next(UTILS.unAuthorized(message[401]))
                    } else {
                        req.user = payload
                        next();
                    }
                });
            }
            return next(UTILS.unAuthorized(message[403]))
        } catch (error) {
            return next(UTILS.err(err.message, message[500]))
        }
    }
};
