import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { Aircraft, AircraftSchema } from 'src/schemas/aircraft.schema';
import { AircraftService } from './aircraft.service';
import { AircraftController } from './aircraft.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Aircraft.name,
      schema: AircraftSchema
    }]),
  ],
  controllers: [AircraftController],
  providers: [AircraftService],
})
export class AircraftModule { }
