  import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
  import {MongooseModule} from "@nestjs/mongoose";
import { UsersModule } from './users/users.module';
import { DeedsModule } from './deeds/deeds.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://Sasha:sasha11@cluster0.czlbc6i.mongodb.net/goodDeeds?retryWrites=true&w=majority'),
    UsersModule,
    DeedsModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
