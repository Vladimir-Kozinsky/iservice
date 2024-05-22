import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Limit } from './limit.schema';
import { ApuHistory } from './apuHistory.schema';
export type ApuDocument = HydratedDocument<Apu>;
export declare class Apu {
    _id: Types.ObjectId;
    type: string;
    msn: string;
    manufDate: string;
    tsn: string;
    csn: string;
    apuHistory: [ApuHistory];
    overhaulNum: number;
    lastOverhaulDate: string;
    tsnAtLastOverhaul: string;
    csnAtLastOverhaul: string;
    limits: [Limit];
}
export declare const ApuSchema: mongoose.Schema<Apu, mongoose.Model<Apu, any, any, any, mongoose.Document<unknown, any, Apu> & Omit<Apu & Required<{
    _id: Types.ObjectId;
}>, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Apu, mongoose.Document<unknown, {}, mongoose.FlatRecord<Apu>> & Omit<mongoose.FlatRecord<Apu> & Required<{
    _id: Types.ObjectId;
}>, never>>;
