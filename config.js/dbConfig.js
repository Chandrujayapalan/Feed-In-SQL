let connection = {
    username: "root",
    password: "root",
    database: "feed_database",
    host:"localhost",
    port: 3306,
    dialect: "mysql",
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}

module.exports = {
    ...connection
};