export interface IUser {
    _id: string | null;
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    position: string | null;
    role: string | null;
    isActivated: string | null;
}

export interface IAircraft {
    _id: string | null;
    type: string | null;
    msn: string | null;
    regNum: string | null;
    manufDate: string | null;
    initFh: string | null;
    initFc: string | null;
    fh: string | null;
    fc: string | null;
    overhaulNum?: number | null;
    lastOverhaulDate?: string | null;
    tsnAtLastOverhaul?: string | null;
    csnAtLastOverhaul?: string | null;
    engines: [];
    apu: any;
    legs: [];
    limits: ILimit[];
}

export interface IEngine {
    _id: string | null;
    type: string | null;
    msn: string | null;
    manufDate: string | null;
    position: number | null;
    tsn: string | null;
    csn: string | null;
    overhaulNum?: number | null;
    lastOverhaulDate: string | null;
    tsnAtLastOverhaul: string | null;
    csnAtLastOverhaul: string | null;
    engineHistory: IEngineHistory[];
    limits: ILimits[];
}

interface ILimits {
    _id: string;
    title: string;
    dependence: string;
    threshold: string;
}

interface IEngineHistory {
    _id: string;
    date: string;
    action: string;
    aircraft: string;
    position: number;
    aircraftTsn: string;
    aircraftCsn: string;
    engineTsn: string;
    engineCsn: string;
    reason: string
}

export interface ICreateEngineDto {
    type: string;
    msn: string;
    manufDate: string;
    tsn: string;
    csn: string;
    overhaulNum?: number;
    lastOverhaulDate?: string;
    tsnAtLastOverhaul?: string;
    csnAtLastOverhaul?: string;
}

 export interface ILimit {
    _id: string;
    title: string;
    dependence: string;
    threshold: string;
}