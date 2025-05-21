import { IsEmail, IsNotEmpty, IsString, MinLength, minLength } from "class-validator";

export class RegisterDto {
    @IsNotEmpty() // Name should not be empty
    name: string

    @IsNotEmpty()
    username: string

    @IsNotEmpty()
    @IsEmail() // Email should not be empty and must be a valid email format
    email: string

    
    // Password should not be empty and must be at least 6 characters
    @IsNotEmpty()
    @MinLength(6) 
    password: string

    // Phone number should not be empty
    @IsNotEmpty()
    phone: number

    // Role should be a string and one of 'customer' or 'admin'
    @IsString()
    role: 'customer' | 'admin'

}