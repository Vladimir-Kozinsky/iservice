import { Module } from '@nestjs/common';
import { ApuController } from './apu.controller';
import { ApuService } from './apu.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Apu, ApuSchema } from 'src/schemas/apu.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Apu.name,
      schema: ApuSchema
    }]),
  ],
  controllers: [ApuController],
  providers: [ApuService]
})
export class ApuModule {}
