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
    _id: string;
    type: string;
    msn: string;
    regNum: string;
    manufDate: string;
    initFh: string;
    initFc: string;
    fh: string;
    fc: string;
    overhaulNum?: number;
    lastOverhaulDate?: string;
    tsnAtLastOverhaul?: string;
    csnAtLastOverhaul?: string;
    engines: IEngine[];
    apu: any;
    legs: ILeg[];
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

export interface IEngineHistory {
    _id: string;
    date: string;
    action: string;
    aircraft: string;
    engine: string;
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

export interface ILeg {
    _id: string;
    aircraft: string;
    engines: ILegEngine[];
    apu: string;
    depDate: string;
    flightNumber: string;
    from: string;
    to: string;
    blockOff: string;
    takeOff: string;
    landing: string;
    blockOn: string;
    flightTime: string;
    blockTime: string;
    fh: string;
    fc: string;
}

export interface ILegEngine {
    msn: string | null;
    engineTsn: string | null;
    engineCsn: string | null;
}

export interface IApuHistory {
    _id: string;
    date: string;
    action: string;
    aircraft: string;
    apu: string;
    aircraftTsn: string;
    aircraftCsn: string;
    apuTsn: string;
    apuCsn: string;
    reason: string
}

export interface IApu {
    _id: string;
    type: string;
    msn: string;
    manufDate: string;
    tsn: string;
    csn: string;
    overhaulNum?: number;
    lastOverhaulDate: string;
    tsnAtLastOverhaul: string;
    csnAtLastOverhaul: string;
    apuHistory: IApuHistory[];
    limits: ILimits[];
}

export interface ICreateApuDto {
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