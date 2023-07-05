import { Injectable } from "@nestjs/common";
import { User, Note} from "@prisma/client"
import { PrismaService } from "../prisma/prisma.service";
import { AuthDTO } from "./dto";
import * as argon from "argon2";

@Injectable({})

export class AuthService {
    constructor(private prismaService: PrismaService){

    }

    async register(authDTO: AuthDTO) {
        //generate password to hashedPassword
        const hashedPassword = await argon.hash(authDTO.password)
        // insert data to database
        try {
            const user = await this.prismaService.user.create({
                data: {
                    email: authDTO.email,
                    hashedPassword: hashedPassword,
                    firstName: '',
                    lastName: '',
                },
                //only show id, email and created
                select: {
                    id: true,
                    email: true,
                    createdAt: true,
                }
            })
            return user;
        }catch(error) {
            return {
                error
            }
        }
    }

    login() {
        return {
            message: 'login for a new user'
        };
    }
}