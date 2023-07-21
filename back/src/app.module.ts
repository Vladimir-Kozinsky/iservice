import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AircraftModule } from './Aircraft/aircraft.module';
import { EngineModule } from './Engine/engine.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://user1:user1@cluster0.lswt8ul.mongodb.net/new-way?retryWrites=true&w=majority'), 
  AuthModule, AircraftModule, EngineModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule { }
