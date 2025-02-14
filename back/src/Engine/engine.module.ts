import { Module } from '@nestjs/common';
import { EngineController } from './engine.controller';
import { EngineService } from './engine.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Engine, EngineSchema } from 'src/schemas/engine.schema';
import { Cfm56Limit, Cfm56LimitSchema } from 'src/schemas/cfm56Limit.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Engine.name,
      schema: EngineSchema
    }]),
    MongooseModule.forFeature([{
      name: Cfm56Limit.name,
      schema: Cfm56LimitSchema
    }]),
  ],
  controllers: [EngineController],
  providers: [EngineService]
})
export class EngineModule {

}
