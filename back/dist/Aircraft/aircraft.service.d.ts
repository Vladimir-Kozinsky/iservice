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
import { CreateAircraftDto } from 'src/dto/create-aircraft.dto';
import { CreateLimitDto } from 'src/dto/create-limit.dto';
import { DeleteLimitDto } from 'src/dto/delete-limit.dto';
import { InstallApuDto } from 'src/dto/apu/install-apu.dto';
import { InstallEngineDto } from 'src/dto/install-engine.dto';
import { Aircraft } from 'src/schemas/aircraft.schema';
import { Apu } from 'src/schemas/apu.schema';
import { Engine } from 'src/schemas/engine.schema';
import { Limit } from 'src/schemas/limit.schema';
export declare class AircraftService {
    private readonly aircraftModel;
    private readonly engineModel;
    private readonly apuModel;
    private readonly limitModel;
    constructor(aircraftModel: Model<Aircraft>, engineModel: Model<Engine>, apuModel: Model<Apu>, limitModel: Model<Limit>);
    add(createAircraftDto: CreateAircraftDto): Promise<import("mongoose").Document<unknown, {}, Aircraft> & Omit<Aircraft & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, never>>;
    getAircrafts(): Promise<Omit<Omit<import("mongoose").Document<unknown, {}, Aircraft> & Omit<Aircraft & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, never>, never>, never>[]>;
    installEngine(installDataDto: InstallEngineDto): Promise<import("mongoose").Document<unknown, {}, Engine> & Omit<Engine & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, never>>;
    installApu(installDataDto: InstallApuDto): Promise<import("mongoose").Document<unknown, {}, Apu> & Omit<Apu & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, never>>;
    removeEngine(removalDataDto: InstallEngineDto): Promise<import("mongoose").Document<unknown, {}, Engine> & Omit<Engine & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, never>>;
    removeApu(removalDataDto: InstallApuDto): Promise<import("mongoose").Document<unknown, {}, Apu> & Omit<Apu & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, never>>;
    addLimit(createLimitDto: CreateLimitDto): Promise<import("mongoose").Document<unknown, {}, Limit> & Omit<Limit & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, never>>;
    delLimit(deleteLimitDto: DeleteLimitDto): Promise<string>;
    updateLimit(deleteLimitDto: DeleteLimitDto): Promise<import("mongoose").UpdateWriteOpResult>;
}
