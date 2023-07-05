import { IsEmail, IsNotEmpty, IsString } from "class-validator";

//Define a "type" of "authentication request"
//validate email and password 
export class AuthDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}