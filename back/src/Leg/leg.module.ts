import { Module } from '@nestjs/common';
import { LegController } from './leg.controller';
import { LegService } from './leg.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Aircraft, AircraftSchema } from 'src/schemas/aircraft.schema';
import { Leg, LegSchema } from 'src/schemas/leg.schema';
import { Engine, EngineSchema } from 'src/schemas/engine.schema';
import { Gear, GearSchema } from 'src/schemas/gear.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Leg.name,
      schema: LegSchema
    }]),
    MongooseModule.forFeature([{
      name: Aircraft.name,
      schema: AircraftSchema
    }]),
    MongooseModule.forFeature([{
      name: Engine.name,
      schema: EngineSchema
    }]),
    MongooseModule.forFeature([{
      name: Gear.name,
      schema: GearSchema
    }])
  ],
  controllers: [LegController],
  providers: [LegService]
})

export class LegModule { }
