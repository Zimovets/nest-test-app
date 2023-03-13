import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { UsersService } from '../src/modules/users/users.service';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    await app.init();
  });

  afterAll(async () => {
    const usersService = app.get(UsersService);
    await usersService.deleteAll();
    await app.close();
  });

  describe('/auth/signup (POST)', () => {
    it('should create a new user', () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          name: 'testname',
          email: 'test@example.com',
          password: 'password',
        })
        .expect(201);
    });
  });

  describe('/auth/signup (POST)', () => {
    it('should return 400 code, required field is absent', () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          email: 'test@example.com',
          password: 'password',
        })
        .expect(400);
    });
  });

  describe('/auth/signup (POST)', () => {
    it('should return 400 code, email field is not email', () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          name: 'testname',
          email: 'testexamplecom',
          password: 'password',
        })
        .expect(400);
    });
  });

  describe('/auth/login (POST)', () => {
    it('should return an access token', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          username: 'test@example.com',
          password: 'password',
        })
        .expect(201)
        .then((response) => {
          expect(response.body.token).toBeDefined();
        });
    });
  });
});
