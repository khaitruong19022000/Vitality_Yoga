/**
 * How to open prisma studio on "TEST" database ?
 * npx dotenv -e .env.test -- prisma studio
 * How to open prisma studio on "DEV" database ?
 * npx dotenv -e .env -- prisma studio
 */
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common/interfaces';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { PrismaService } from '../src/prisma/prisma.service';
import * as pactum from 'pactum'

const PORT = 3002
describe('App End_to_End tests', () => {
  let app: INestApplication
  let prismaService: PrismaService
  beforeAll(async () => {
    const appModule =  await Test.createTestingModule({
      imports: [AppModule]
    }).compile()
    app = appModule.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init()
    await app.listen(PORT)
    prismaService = app.get(PrismaService)
    await prismaService.cleanDatabase();
    pactum.request.setBaseUrl(`http://localhost:${PORT}`)
  })

  describe('Test Authentication', () => {
    describe('Register', () => {
      it('should show error with empty email', () => {
        return pactum.spec()
              .post(`/auth/register`)
              .withBody({
                email: '',
                password: 'test123'
              })
              .expectStatus(400)
      })

      it('should show error with invalid email format', () => {
        return pactum.spec()
              .post(`/auth/register`)
              .withBody({
                email: 'test1234@gmail',
                password: 'test123'
              })
              .expectStatus(400)
      })

      it('should show error IF password is empty', () => {
        return pactum.spec()
              .post(`/auth/register`)
              .withBody({
                email: 'test1234@gmail',
                password: ''
              })
              .expectStatus(400)
      })

      //many other case 

      it('should Register', () => {
        return pactum.spec()
              .post(`/auth/register`)
              .withBody({
                email: 'test123@gmail.com',
                password: 'test123'
              })
              .expectStatus(201)
      })
    })

    describe('Login', () => {
      it('should Login', () => {
        return pactum.spec()
              .post(`/auth/login`)
              .withBody({
                email: 'test123@gmail.com',
                password: 'test123'
              })
              .expectStatus(201)
              .stores('accessToken', "accessToken")
      })
    })

    describe('User', () => {
      describe('Get Detail User', () => {
        it('should get detail user', () => {
          return pactum.spec()
                .get(`/users/me`)
                .withHeaders({
                  Authorization: 'Bearer $S{accessToken}'
                })
                .expectStatus(200)
        })
      })
    })

    describe('Note', () => {
      describe('Insert Note', () => {

      })
      describe('Get all Note', () => {
        
      })
      describe('Get Note by Id', () => {
        
      })
      describe('Delete by Id', () => {
        
      })
    })
  })

  afterAll(async () => {
    app.close()
  })
})
