import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @ApiProperty({description:'Nombre de usuario'})
    @IsString ({message:'El nombre deben ser caracteres'})
    @IsNotEmpty({message:'El nombre no debe estar vacio'})
    name: String;
    
    @ApiProperty({description:'Correo Electronico'})
    @IsEmail ({}, {message:'El formato debe ser de correo'})
    @IsNotEmpty({message:'El correo no debe estar vacio'})
    email: String;
    
    @ApiProperty({description:'Contraseña de usuario'})
    @MinLength (6, {message:'La contraseña debe tener como minimo 6 caracteres'})
    @IsString({message:'La contraseña debe ser una cadena'})
    password: String;


}
