'use strict'

const Database = use('Database')
const ModelUser = use('App/Models/Token')
const ModelSubscription = use('App/Models/Subscription')
const Hash = use('Hash')
class UserController {

    async getProfile({auth,response}){
        const dataUser = auth.current.user
        response.json(dataUser)
    }

    async isLoggin({auth,request,response}){
        const user = await auth.getUser()
        const revoked = await Database.table('tokens').where('user_id',user.id).orderBy('id','desc').limit('1')
        if(revoked[0].is_revoked != 0){
            response.json({success:false,message:'Login First'})
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

    async subscribe({request,response,auth}){
        try{
            const dataUser = auth.current.user
            const subscribe = new ModelSubscription()
            subscribe.id_user = dataUser.id
            subscribe.email = dataUser.email
            subscribe.id_movie = request.input('id_movie')
            subscribe.category = request.input('category')
            subscribe.save()
            response.json({success:true,message:`Add subscribe ${request.input('movie')}`})
        }catch(e){
            response.json({success:false,message:e.message})
        }
    }

}

module.exports = UserController
