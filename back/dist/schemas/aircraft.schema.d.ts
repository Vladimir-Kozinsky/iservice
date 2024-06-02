import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Limit } from './limit.schema';
import { Engine } from './engine.schema';
import { Apu } from './apu.schema';
export type AircraftDocument = HydratedDocument<Aircraft>;
export declare class Aircraft {
    _id: Types.ObjectId;
    regNum: string;
    type: string;
    typeCert: string;
    manufDate: string;
    msn: string;
    code: string;
    mtow: number;
    mzfw: number;
    mlw: number;
    mtw: number;
    fuelCap: number;
    bew: number;
    cg: number;
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
    landingGears: Limit[];
}
export declare const AircraftSchema: mongoose.Schema<Aircraft, mongoose.Model<Aircraft, any, any, any, mongoose.Document<unknown, any, Aircraft> & Omit<Aircraft & Required<{
    _id: Types.ObjectId;
}>, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Aircraft, mongoose.Document<unknown, {}, mongoose.FlatRecord<Aircraft>> & Omit<mongoose.FlatRecord<Aircraft> & Required<{
    _id: Types.ObjectId;
}>, never>>;
