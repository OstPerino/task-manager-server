import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {ConfigModule} from '@nestjs/config';
import {UsersModule} from './users/users.module';
import {User} from './users/users.model';
import {ProjectsModule} from './projects/projects.module';
import {Project} from './projects/projects.model';
import {UsersProjects} from './projects/user-projects.model';
import {AuthModule} from './auth/auth.module';
import {BoardModule} from './board/board.module';
import {Board} from "./board/board.model";
import {Notification} from "./notifications/notifications.model";
import {NotificationsModule} from './notifications/notifications.module';
import {UsersBoards} from "./board/user-boards.model";
import { TasksModule } from './tasks/tasks.module';
import {Task} from "./tasks/tasks.model";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Project, UsersProjects, Board, Notification, UsersBoards, Task],
      autoLoadModels: true,
    }),
    UsersModule,
    ProjectsModule,
    AuthModule,
    BoardModule,
    NotificationsModule,
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
