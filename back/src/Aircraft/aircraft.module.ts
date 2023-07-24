import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { Aircraft, AircraftSchema } from 'src/schemas/aircraft.schema';
import { AircraftService } from './aircraft.service';
import { AircraftController } from './aircraft.controller';
import { Engine, EngineSchema } from 'src/schemas/engine.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Aircraft.name,
      schema: AircraftSchema
    }]),
    MongooseModule.forFeature([{
      name: Engine.name,
      schema: EngineSchema
    }]),
  ],
  controllers: [AircraftController],
  providers: [AircraftService],
})
export class AircraftModule { }
