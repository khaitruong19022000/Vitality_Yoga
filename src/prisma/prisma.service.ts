import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
// this service is used to connect DB
export class PrismaService extends PrismaClient{
    constructor(configService: ConfigService){
        super({
            datasources: {
                db: {
                    // url: 'postgresql://postgres:Abc123456789@localhost:5434/testdb?schema=public'
                    url: configService.get('DATABASE_URL')
                }
            }
        })
        console.log('db url: ' + configService.get('DATABASE_URL'));
    }
}
