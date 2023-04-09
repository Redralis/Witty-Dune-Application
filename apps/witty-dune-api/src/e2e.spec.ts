import { INestApplication, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Neo4jModule } from './app/neo/neo4j.module';
import { AuthModule } from './app/auth/auth.module';
import { UsersModule } from './app/users/users.module';
import { Test, TestingModule } from '@nestjs/testing';
import { disconnect } from 'mongoose';
import { jwtConstants } from './app/auth/constants';
import { AppModule } from './app/app.module';
import { MongoClient } from 'mongodb';
import request = require('supertest');
import { AppController } from './app/app.controller';

let mongod: MongoMemoryServer;
let uri: string;

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => {
        mongod = await MongoMemoryServer.create();
        uri = mongod.getUri();
        return { uri };
      },
    }),
    Neo4jModule.forRoot({
      scheme: 'neo4j',
      host: 'localhost',
      username: 'neo4j',
      password: 'hallo',
      database: 'witty-dune-neo-test',
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class TestAppModule {}

describe('end-to-end tests of data API', () => {
  let app: INestApplication;
  let module: TestingModule;
  let mongoc: MongoClient;
  let server;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [TestAppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
    app.setGlobalPrefix('api');

    mongoc = new MongoClient(uri);
    await mongoc.connect();

    server = app.getHttpServer();
  });

  beforeEach(async () => {
    await mongoc.db('test').collection('users').deleteMany({});
  });

  afterAll(async () => {
    await app.close();
    await mongoc.close();
    await disconnect();
    await mongod.stop();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  it('should be able to register a user', async () => {
    const response = await request(server)
      .post('/auth/register')
      .send({
        username: 'testuser',
        password: 'testpassword',
        country: 'testcountry',
        dateofbirth: new Date('2000-01-01'),
        profilepic: 'testprofilepic',
        email: 'testemail',
        lastname: 'testlastname',
        firstname: 'testfirstname',
      })
      .expect(201);
  });

  it('should be able to log in a user', async () => {
    const reg = await request(server)
      .post('/auth/register')
      .send({
        username: 'testuser',
        password: 'testpassword',
        country: 'testcountry',
        dateofbirth: new Date('2000-01-01'),
        profilepic: 'testprofilepic',
        email: 'testemail',
        lastname: 'testlastname',
        firstname: 'testfirstname',
      });
    const result = await request(server).post('/auth/login').send({
      username: 'testuser',
      password: 'testpassword',
    });
    expect(result.status).toBe(201);
    expect(result.body).toHaveProperty('access_token');
  });

  it('should not allow a user to log in with an incorrect password.', async () => {
    const reg = await request(server)
      .post('/auth/register')
      .send({
        username: 'testuser',
        password: 'testpassword',
        country: 'testcountry',
        dateofbirth: new Date('2000-01-01'),
        profilepic: 'testprofilepic',
        email: 'testemail',
        lastname: 'testlastname',
        firstname: 'testfirstname',
      });
    const result = await request(server).post('/auth/login').send({
      username: 'testuser',
      password: 'incorrectpassword',
    });
    expect(result.status).toBe(401);
    expect(result.body).toHaveProperty('message');
    expect(result.body.message).toBe('Unauthorized');
  });
});
