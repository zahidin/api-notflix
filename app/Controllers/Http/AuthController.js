'use strict'    

const ModelUser = use('App/Models/User')
const { validate } = use('Validator')
class AuthController {
    
    async login({request, response, auth}){
        try{
            const rules = {
                email: 'required',
                password: 'required'
            }
            const validation = await validate(request.all(), rules)

            if(!validation.fails()){
                const { email, password } = request.all()
                const data = await auth.authenticator('jwt').withRefreshToken().attempt(email,password)
                response.json(data)    
            }else{
                response.status(400).json(validation.messages())    
            }
        }catch(e){
            response.json({success:false,message:e.message})
        }
    }
    async logout({auth,response}){
        const apiToken = auth.getAuthHeader()
        await auth.authenticator('jwt').revokeTokens([apiToken])
        // const user = auth.current.user
        // const token = auth.getAuthHeader()
        // await user.tokens().where('token',token).update({is_revoked:true})
        response.json({success:true,message:"Logout success"})
    }

    async register({request,response}){
        try{
            const checkUser = await ModelUser.findBy('email',request.input('email'))

            if(checkUser){
                response.status(400).json({success:false,message:'Email sudah terdaftar'})
            }else{
                const rules = {
                    name: 'required',
                    username: 'required|unique:users,username',
                    email: 'required|email|unique:users,email',
                    password: 'required'
                }
                const validation = await validate(request.all(), rules)

                if(!validation.fails()){
                    const dataUser = new ModelUser()
                    dataUser.name = request.input('name')
                    dataUser.email = request.input('email')
                    dataUser.username = request.input('username')
                    dataUser.password = request.input('password')
                    await dataUser.save()

                    response.status(200).json({success:true,message:'Success add user'})
                }else{
                    response.status(400).json(validation.messages())    
                }
            }
        }catch(e){
            response.json({success:false,message:e.message})
        }
    }
}

module.exports = AuthController
