const bcrypt = require('bcryptjs')
async function superAdmin(User) {
    try {
        let user = {
            name: "Chandru",
            email: "chandru@gmail.com",
            password: await bcrypt.hash("Chandru#311", 10),
            role: "Super Admin",
            permission : 1
        }
        let userData = await User.findOrCreate(
            {
                where: {
                    email: "chandru@gmail.com",
                    id: 1
                },
                defaults: user
            }
        )
        console.log(userData[1])
        return true;


    } catch (error) {

    }


}
module.exports = {
    superAdmin
}