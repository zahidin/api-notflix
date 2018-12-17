'use strict'

const ModelUser = use('App/Models/User')
class AuthController {
    
    async login({request, response, auth}){
        try{
            const { email, password } = request.all()
            const data = await auth.authenticator('jwt').withRefreshToken().attempt(email,password)
            response.json(data)
        }catch(e){
            response.json({success:false,message:e.message})
        }
    }

    async register({request,response}){
        try{
            const checkUser = await ModelUser.findBy('email',request.input('email'))

            if(checkUser){
                response.status(400).json({success:false,message:'Email sudah terdaftar'})
            }else{
                const dataUser = new ModelUser()
                dataUser.name = request.input('name')
                dataUser.email = request.input('email')
                dataUser.username = request.input('username')
                dataUser.password = request.input('password')
                await dataUser.save()
                response.status(200).json({success:true,message:'Register success'})
            }
        }catch(e){
            response.json({success:false,message:e.message})
        }
    }
}

module.exports = AuthController
