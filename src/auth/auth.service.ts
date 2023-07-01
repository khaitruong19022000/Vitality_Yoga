import { Injectable } from "@nestjs/common";

@Injectable({})

export class AuthService {
    getProducts(): string {
        return 'hello yoga';
    }
}