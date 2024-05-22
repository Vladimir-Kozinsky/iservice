import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Limit } from './limit.schema';
import { EngineHistory } from './engineHistory.schema';
export type EngineDocument = HydratedDocument<Engine>;
export declare class Engine {
    _id: Types.ObjectId;
    type: string;
    msn: string;
    manufDate: string;
    position: number;
    tsn: string;
    csn: string;
    engineHistory: [EngineHistory];
    overhaulNum: number;
    lastOverhaulDate: string;
    tsnAtLastOverhaul: string;
    csnAtLastOverhaul: string;
    limits: [Limit];
}
export declare const EngineSchema: mongoose.Schema<Engine, mongoose.Model<Engine, any, any, any, mongoose.Document<unknown, any, Engine> & Omit<Engine & Required<{
    _id: Types.ObjectId;
}>, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Engine, mongoose.Document<unknown, {}, mongoose.FlatRecord<Engine>> & Omit<mongoose.FlatRecord<Engine> & Required<{
    _id: Types.ObjectId;
}>, never>>;
