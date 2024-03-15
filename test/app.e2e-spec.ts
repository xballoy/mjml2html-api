import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { INestApplication } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';
import { MjmlModule } from '../src/mjml.module';

describe('MJML Controller', () => {
  let app: INestApplication;

  const readFixture = async (filename: string) => {
    return readFile(join(__dirname, '..', 'fixtures', filename), 'utf-8');
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MjmlModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(new FastifyAdapter());
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  it('POST /', async () => {
    const mjml = await readFixture('valid.mjml');
    return request(app.getHttpServer())
      .post('/')
      .send({
        mjml,
      })
      .expect(200)
      .then((response) => {
        expect(response.body).toMatchSnapshot();
      });
  });
});
