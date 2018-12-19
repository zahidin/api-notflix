'use strict'

const Database = use('Database')
const Hash = use('Hash')
class UserController {

    async getProfile({auth,response}){
        const dataUser = auth.current.user
        response.json(dataUser)
    }

    async isLoggin({auth,request,response}){
        const user = await auth.getUser()
        if(user){
            response.json({success:true,message:"User is login"})
        }else{
            response.json({success:false,message:"User not login"})
        }
    }

    async changePassword({request,auth,response}){
        const dataUser = auth.user.toJSON()
        const verifPassword = await Hash.verify(request.input('password_lama'), dataUser.password)
        if(verifPassword){

            const passworBaru = await Hash.make(request.input('password_baru'))
            const user = await Database.table('users').where('id',dataUser.id).update('password',passworBaru)
            response.json({success:true,message:"Change password success"})
            
        }else{
            response.json({success:false,message:"Password miss match"})
        }
        
    }

}

module.exports = UserController
