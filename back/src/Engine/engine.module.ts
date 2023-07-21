import { Module } from '@nestjs/common';
import { EngineController } from './engine.controller';
import { EngineService } from './engine.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Engine, EngineSchema } from 'src/schemas/engine.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Engine.name,
      schema: EngineSchema
    }]),
  ],
  controllers: [EngineController],
  providers: [EngineService]
})
export class EngineModule {

}
