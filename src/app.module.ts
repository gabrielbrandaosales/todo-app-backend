import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123',
      database: 'todo',
      autoLoadEntities: true,
      synchronize: true, // Somente em desenvolvimento!
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
