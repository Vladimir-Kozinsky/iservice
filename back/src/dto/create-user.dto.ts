import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsNotEmpty()
    readonly firstName: string;
    
    @IsNotEmpty()
    readonly lastName: string;
    
    @IsNotEmpty()
    readonly position: string;
    
    @IsNotEmpty()
    readonly password: string;
    
    @IsNotEmpty()
    readonly role: string;
  }