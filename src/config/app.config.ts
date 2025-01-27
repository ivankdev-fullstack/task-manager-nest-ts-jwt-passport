import { registerAs } from '@nestjs/config';

export interface AppConfig {
  PORT: number;
}

export const appConfig = registerAs(
  'app',
  (): AppConfig => ({
    PORT: parseInt(process.env.PORT as string) ?? 3000,
  }),
);
