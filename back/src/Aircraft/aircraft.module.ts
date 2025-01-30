import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { Aircraft, AircraftSchema } from 'src/schemas/aircraft.schema';
import { AircraftService } from './aircraft.service';
import { AircraftController } from './aircraft.controller';
import { Engine, EngineSchema } from 'src/schemas/engine.schema';
import { Limit, LimitSchema } from 'src/schemas/limit.schema';
import { Apu, ApuSchema } from 'src/schemas/apu.schema';
import { Gear, GearSchema } from 'src/schemas/gear.schema';

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
    MongooseModule.forFeature([{
      name: Apu.name,
      schema: ApuSchema
    }]),
    MongooseModule.forFeature([{
      name: Limit.name,
      schema: LimitSchema
    }]),
    MongooseModule.forFeature([{
      name: Gear.name,
      schema: GearSchema
    }]),
  ],
  controllers: [AircraftController],
  providers: [AircraftService],
})
export class AircraftModule { }
