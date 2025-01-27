import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { AppConfig } from './app.config';
import { AuthConfig } from './auth.config';

export interface ConfigType {
  app: AppConfig;
  auth: AuthConfig;
  database: TypeOrmModuleOptions;
}

export const appConfigSchema = Joi.object({
  PORT: Joi.number().required(),
  DB_HOST: Joi.string().default('localhost'),
  DB_PORT: Joi.number().default(5432),
  DB_USER: Joi.string().required(),
  DB_PASS: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_SYNC: Joi.number().valid(0, 1).required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().default('60m').required(),
});
