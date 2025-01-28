import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { UserRole } from 'src/user/entity/user.types';
import { hashPass } from 'src/utils/utils';
import * as request from 'supertest';
import { TestSetup } from 'test/utils/test.setup';
import { AppModule } from './../src/app.module';

describe('Authentication & Authorization (e2e)', () => {
  let testSetup: TestSetup;

  beforeEach(async () => {
    testSetup = await TestSetup.create(AppModule);
  });

  afterEach(async () => {
    await testSetup.cleanup();
  });

  afterAll(async () => {
    await testSetup.teardown();
  });

  const testUser = {
    email: 'test@example.com',
    password: 'Password123!',
    name: 'Test User',
  };

  it('should require auth', () => {
    return request(testSetup.app.getHttpServer()).get('/tasks').expect(401);
  });

  it('should allow public route access', async () => {
    await request(testSetup.app.getHttpServer())
      .post('/auth/register')
      .send(testUser)
      .expect(201);

    await request(testSetup.app.getHttpServer())
      .post('/auth/login')
      .send(testUser)
      .expect(201);
  });

  it('should include roles in JWT token', async () => {
    const userRepo = testSetup.app.get(getRepositoryToken(User));

    await userRepo.save({
      ...testUser,
      roles: [UserRole.ADMIN],
      password: await hashPass(testUser.password),
    });

    const response = await request(testSetup.app.getHttpServer())
      .post('/auth/login')
      .send({ email: testUser.email, password: testUser.password });

    const decoded = testSetup.app
      .get(JwtService)
      .verify(response.body.accessToken);

    expect(decoded.roles).toBeDefined();
    expect(decoded.roles).toContain(UserRole.ADMIN);
  });

  it('/auth/register (POST)', () => {
    return request(testSetup.app.getHttpServer())
      .post('/auth/register')
      .send(testUser)
      .expect(201)
      .expect((res) => {
        expect(res.body.email).toBe(testUser.email);
        expect(res.body.name).toBe(testUser.name);
        expect(res.body).not.toHaveProperty('password');
      });
  });

  it('/auth/register (POST) - duplicate email', async () => {
    await request(testSetup.app.getHttpServer())
      .post('/auth/register')
      .send(testUser);

    return await request(testSetup.app.getHttpServer())
      .post('/auth/register')
      .send(testUser)
      .expect(409);
  });

  it('/auth/login (POST)', async () => {
    await request(testSetup.app.getHttpServer())
      .post('/auth/register')
      .send(testUser);

    const response = await request(testSetup.app.getHttpServer())
      .post('/auth/login')
      .send({ email: testUser.email, password: testUser.password });

    expect(response.status).toBe(201);
    expect(response.body.accessToken).toBeDefined();
  });

  it('/auth/profile (GET)', async () => {
    await request(testSetup.app.getHttpServer())
      .post('/auth/register')
      .send(testUser);

    const response = await request(testSetup.app.getHttpServer())
      .post('/auth/login')
      .send({ email: testUser.email, password: testUser.password });
    const token = response.body.accessToken;

    return await request(testSetup.app.getHttpServer())
      .get('/auth/profile')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.email).toBe(testUser.email);
        expect(res.body.name).toBe(testUser.name);
        expect(res.body).not.toHaveProperty('password');
      });
  });

  it('/auth/admin (GET) - admin access', async () => {
    const userRepo = testSetup.app.get(getRepositoryToken(User));

    await userRepo.save({
      ...testUser,
      roles: [UserRole.ADMIN],
      password: await hashPass(testUser.password),
    });

    const response = await request(testSetup.app.getHttpServer())
      .post('/auth/login')
      .send({ email: testUser.email, password: testUser.password });
    const token = response.body.accessToken;

    return request(testSetup.app.getHttpServer())
      .get('/auth/admin')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.message).toBe('This is for admins only!');
      });
  });
});
