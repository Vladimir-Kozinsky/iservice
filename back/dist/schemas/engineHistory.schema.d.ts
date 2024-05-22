/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { HydratedDocument, Types } from 'mongoose';
export type EngineHistoryDocument = HydratedDocument<EngineHistory>;
export declare class EngineHistory {
    date: string;
    action: string;
    aircraft: string;
    engine: string;
    position: number;
    aircraftTsn: string;
    aircraftCsn: string;
    engineTsn: string;
    engineCsn: string;
    reason: string;
}
export declare const EngineHistorySchema: import("mongoose").Schema<EngineHistory, import("mongoose").Model<EngineHistory, any, any, any, import("mongoose").Document<unknown, any, EngineHistory> & Omit<EngineHistory & {
    _id: Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, EngineHistory, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<EngineHistory>> & Omit<import("mongoose").FlatRecord<EngineHistory> & {
    _id: Types.ObjectId;
}, never>>;
