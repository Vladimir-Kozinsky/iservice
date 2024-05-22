import { ApuHistory } from "src/schemas/apuHistory.schema";
import { Limit } from "src/schemas/limit.schema";
export declare class CreateApuDto {
    readonly type: string;
    readonly msn: string;
    readonly manufDate: string;
    readonly tsn: string;
    readonly csn: string;
    readonly apuHistory: [ApuHistory];
    readonly overhaulNum: number;
    readonly lastOverhaulDate: string;
    readonly tsnAtLastOverhaul: string;
    readonly csnAtLastOverhaul: string;
    readonly limits: [Limit];
}
