import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Limit } from './limit.schema';
import { Engine } from './engine.schema';
import { Apu } from './apu.schema';
export type AircraftDocument = HydratedDocument<Aircraft>;
export declare class Aircraft {
    _id: Types.ObjectId;
    type: string;
    msn: string;
    regNum: string;
    manufDate: string;
    initFh: string;
    initFc: string;
    fh: string;
    fc: string;
    overhaulNum: number;
    lastOverhaulDate: string;
    tsnAtLastOverhaul: string;
    csnAtLastOverhaul: string;
    engines: Engine[];
    apu: Apu;
    limits: Limit[];
}
export declare const AircraftSchema: mongoose.Schema<Aircraft, mongoose.Model<Aircraft, any, any, any, mongoose.Document<unknown, any, Aircraft> & Omit<Aircraft & Required<{
    _id: Types.ObjectId;
}>, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Aircraft, mongoose.Document<unknown, {}, mongoose.FlatRecord<Aircraft>> & Omit<mongoose.FlatRecord<Aircraft> & Required<{
    _id: Types.ObjectId;
}>, never>>;
