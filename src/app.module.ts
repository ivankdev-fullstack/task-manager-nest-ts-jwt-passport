import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { appConfig } from './config/app.config';
import { authConfig } from './config/auth.config';
import { appConfigSchema } from './config/config.types';
import { typeOrmConfig } from './config/database.config';
import { TypedConfigService } from './config/typed-config.service';
import { TaskLabel } from './task-label/entity/task-label.entity';
import { TaskLabelModule } from './task-label/task-label.module';
import { Task } from './task/entity/task.entity';
import { TaskModule } from './task/task.module';
import { User } from './user/entity/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configSecvice: TypedConfigService) => ({
        ...configSecvice.get('database'),
        entities: [Task, User, TaskLabel],
      }),
    }),
    ConfigModule.forRoot({
      load: [appConfig, typeOrmConfig, authConfig],
      validationSchema: appConfigSchema,
      validationOptions: {
        abortEarly: true,
      },
    }),
    TaskModule,
    UserModule,
    TaskLabelModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: TypedConfigService, useExisting: ConfigService },
  ],
})
export class AppModule {}
