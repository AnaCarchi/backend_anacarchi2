import { HttpException, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { hash, compare } from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(private jwtService: JwtService,
        @InjectRepository(User)private userRepository:Repository<User>){}

    async funRegister (objUser:RegisterAuthDto){
        const {password}=objUser //capturamos solo password de todo el objeto
        // console.log("Antes: " , objUser)
        const plainToHash=await hash (password,12) //para encriptar la contraseña
        // console.log(plainToHash) //imprimimos el hash

        objUser={...objUser,password:plainToHash}
        //almacena todos los datos excepto el password que fue sacado y guarda un nuevo password
        // console.log("Despues: ",objUser)

        return this.userRepository.save(objUser) //para guardar enla BDD
    }
    async login(credenciales: LoginAuthDto){

        const {email,password}=credenciales //ensete caso necesitamos los dos campos
        const user=await this.userRepository.findOne({
            where:{
                email:email
            }
        })
        //si no existe el usuario lanzamos una excepcion
        if (!user) return new HttpException('Usuario no encontrado',404);
        const verificarPass = await compare(password,user.password)

        if (!verificarPass) throw new HttpException( 'Password invalido',401)

        let playload= {email: "admin@gmail.com", id:1} //ojo comillas
        const token= this.jwtService.sign(playload)
        return {token:token};

    }
}
