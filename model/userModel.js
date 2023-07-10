
module.exports = (sequelize, DataTypes) => {
    const userMaster = sequelize.define(
        "userMaster",
        {
            name: { type: DataTypes.STRING },
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            password: { type: DataTypes.STRING },
            role: { type: DataTypes.STRING },
            permission: { type: DataTypes.INTEGER }
        },

    );
    // userMaster.associate = function (models) {
    // 	models.userMaster.hasMany(models.orders)
    // }
    // userMaster.hasOne(orders,{
    // 	as : 'order',
    // 	foreignKey: 'userId'
    // })
    // userMaster.associate = function (models) {
    // 	userMaster.hasMany(models.order, {
    // 		foreignKey: 'userId',
    // 		as: 'order'
    // 	});
    // };
    return userMaster;
};
