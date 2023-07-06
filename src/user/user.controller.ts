import { Controller, Get, UseGuards, Req} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";

@Controller('users')

export class UserController {
    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    me(@Req() request: Request){
        // console.log(request.user);
        return request.user
    }
}