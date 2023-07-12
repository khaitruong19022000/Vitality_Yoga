import { Controller, Get, UseGuards, Req} from "@nestjs/common";
import { User } from "@prisma/client";
import { Request } from "express";
import { GetUser } from "../auth/decorator";
import { MyJwtGuard } from "../auth/guard";

@Controller('users')

export class UserController {
    // @UseGuards(AuthGuard('jwt'))
    @UseGuards(MyJwtGuard)
    @Get('me')
    me(@GetUser() user: User){
        // console.log(request.user);
        return user
    }
}