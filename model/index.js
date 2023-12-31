const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const dbConfig = require("../config.js/dbConfig");
const {superAdmin} = require('../common/common')
const db = {};
let sequelize= new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);


(async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync().then(async()=>{

           await superAdmin(db.userModel)

        });

        console.log('Database Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error.message);
    }
})()

fs.readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        db[file.split(".")[0]] = require("./" + file)(sequelize, Sequelize);
    });
console.log(db)
Object.keys(db).forEach(modelName => {
    console.log(modelName)
    if (db[modelName].associate) {
        console.log(modelName)
        db[modelName].associate(db);
    }
});

module.exports = db;