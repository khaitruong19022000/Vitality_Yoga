import { Injectable } from "@nestjs/common";
import { User, Note} from "@prisma/client"
import { PrismaService } from "../prisma/prisma.service";

@Injectable({})

export class AuthService {
    constructor(private prismaService: PrismaService){

    }

    register() {
        return {
            message: 'register a new user'
        };
    }

    login() {
        return {
            message: 'login for a new user'
        };
    }
}