import { Leg } from "src/schemas/leg.schema";
export declare class ResponseLegsDto {
    readonly totalPages: number;
    readonly currentPage: number;
    readonly legs: [Leg];
}
