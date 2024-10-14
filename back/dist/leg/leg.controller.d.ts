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
import { LegService } from './leg.service';
import { Leg } from 'src/schemas/leg.schema';
import { CreateLegDto } from 'src/dto/leg/create-leg.dto';
import { Types } from 'mongoose';
import { GetLegsDto } from 'src/dto/leg/get-legs.dto';
import { GetPrintLegsDto } from 'src/dto/leg/get-print-legs.dto';
export declare class LegController {
    private readonly legService;
    constructor(legService: LegService);
    getAircafts(getLegsDto: GetLegsDto): Promise<{
        totalPages: number;
        currentPage: number;
        legs: Leg[];
    }>;
    getLastTenLegs(getLastTenLegsDto: {
        aircraft: string;
    }): Promise<Leg[]>;
    getPrintLegs(getPrintLegsDto: GetPrintLegsDto): Promise<Leg[]>;
    createLeg(createLegDto: CreateLegDto): Promise<import("mongoose").Document<unknown, {}, import("../schemas/aircraft.schema").Aircraft> & Omit<import("../schemas/aircraft.schema").Aircraft & Required<{
        _id: Types.ObjectId;
    }>, never>>;
    deleteLeg(deleteLegDto: Leg): Promise<Types.ObjectId>;
}
