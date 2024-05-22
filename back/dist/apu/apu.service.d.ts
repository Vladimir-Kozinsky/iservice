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
import { Model } from 'mongoose';
import { CreateApuDto } from 'src/dto/apu/create-apu.dto';
import { CreateLimitDto } from 'src/dto/create-limit.dto';
import { DeleteLimitDto } from 'src/dto/delete-limit.dto';
import { Apu } from 'src/schemas/apu.schema';
import { Limit } from 'src/schemas/limit.schema';
export declare class ApuService {
    private readonly apuModel;
    private readonly limitModel;
    constructor(apuModel: Model<Apu>, limitModel: Model<Limit>);
    add(createApuDto: CreateApuDto): Promise<import("mongoose").Document<unknown, {}, Apu> & Omit<Apu & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, never>>;
    getApus(): Promise<(import("mongoose").Document<unknown, {}, Apu> & Omit<Apu & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, never>)[]>;
    addLimit(createLimitDto: CreateLimitDto): Promise<import("mongoose").Document<unknown, {}, Limit> & Omit<Limit & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, never>>;
    delLimit(deleteLimitDto: DeleteLimitDto): Promise<string>;
}
