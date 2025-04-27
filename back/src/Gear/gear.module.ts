import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Apu, ApuSchema } from 'src/schemas/apu.schema';
import { Limit, LimitSchema } from 'src/schemas/limit.schema';
import { GearController } from './gear.controller';
import { GearService } from './gear.service';
import { Gear, GearSchema } from 'src/schemas/gear.schema';
import { GearLimit, GearLimitSchema } from 'src/schemas/gearLimit.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Gear.name,
      schema: GearSchema
    }]),
    MongooseModule.forFeature([{
      name: GearLimit.name,
      schema: GearLimitSchema
    }]),
  ],
  controllers: [GearController],
  providers: [GearService]
})
export class GearModule {}

