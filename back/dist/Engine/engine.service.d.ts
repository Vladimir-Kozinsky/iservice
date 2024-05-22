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
import { CreateEngineDto } from 'src/dto/create-engine.dto';
import { CreateLimitDto } from 'src/dto/create-limit.dto';
import { DeleteLimitDto } from 'src/dto/delete-limit.dto';
import { Engine } from 'src/schemas/engine.schema';
import { Limit } from 'src/schemas/limit.schema';
export declare class EngineService {
    private readonly engineModel;
    private readonly limitModel;
    constructor(engineModel: Model<Engine>, limitModel: Model<Limit>);
    add(createEngineDto: CreateEngineDto): Promise<import("mongoose").Document<unknown, {}, Engine> & Omit<Engine & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, never>>;
    getEngines(): Promise<(import("mongoose").Document<unknown, {}, Engine> & Omit<Engine & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, never>)[]>;
    addLimit(createLimitDto: CreateLimitDto): Promise<import("mongoose").Document<unknown, {}, Limit> & Omit<Limit & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, never>>;
    delLimit(deleteLimitDto: DeleteLimitDto): Promise<string>;
}
