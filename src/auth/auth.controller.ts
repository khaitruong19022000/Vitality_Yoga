import { Body, Controller, Get, Post, Req} from "@nestjs/common";
import { AuthService } from './auth.service';
import { AuthDTO } from "./dto";

@Controller("auth")

export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post("register") // register a new user
    // body type must be a "Data transfer object" - DTO
    register(@Body() body: AuthDTO) {
        // we need to validate email and password in file DTO !!!
        return this.authService.register(body)
    }

    // Post: .../auth/login
    @Post("login") 
    login() {
        return this.authService.login();
    }
}