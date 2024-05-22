import { EngineHistory } from "src/schemas/engineHistory.schema";
import { Limit } from "src/schemas/limit.schema";
export declare class CreateEngineDto {
    readonly type: string;
    readonly msn: string;
    readonly manufDate: string;
    readonly tsn: string;
    readonly csn: string;
    readonly engineHistory: EngineHistory;
    readonly overhaulNum: number;
    readonly lastOverhaulDate: string;
    readonly tsnAtLastOverhaul: string;
    readonly csnAtLastOverhaul: string;
    readonly limits: [Limit];
}
