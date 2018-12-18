'use strict'

class UserController {

    async getProfile({auth,response}){
        const dataUser = auth.user.toJSON()
        response.json(dataUser)
    }

}

module.exports = UserController
