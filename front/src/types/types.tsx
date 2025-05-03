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
    typeCert: string;
    code: string;
    mtow: string;
    mzfw: string;
    mlw: string;
    mtw: string;
    fuelCap: string;
    bew: string;
    cg: string;
    initFh: string;
    initFc: string;
    fh: string;
    fc: string;
    engines: string[];
    apu: any;
    legs: ILeg[];
    limits: ILimit[];
    lgs: string[];
}

export interface IEngine {
    _id: string | null;
    type: string | null;
    thrust: string | null;
    msn: string | null;
    manuf: string | null;
    manufDate: string | null;
    position: number | null;
    tsn: string | null;
    csn: string | null;
    overhaulNum?: number | null;
    lastOverhaulDate: string | null;
    tsnAtLastOverhaul: string | null;
    csnAtLastOverhaul: string | null;
    engineHistory: IEngineHistory[];
    limits: ICfm56EngineLimit[];
}

interface ILimits {
    _id: string;
    msn: string,
    title: string;
    lastInspDate: string;
    tsnAtLastInsp: string;
    csnAtLastInsp: string;
    nextInspDate: string;
    tsnAtNextInsp: string;
    csnAtNextInsp: string;
}

export interface ILg {
    _id: string;
    pos: string;
    pn: string;
    sn: string;
    tsn: string;
    csn: string;
    lastInspDate: string;
    tsnAtLastInsp: string;
    csnAtLastInsp: string;
    nextInspDate: string;
    tsnAtNextInsp: string;
    csnAtNextInsp: string;
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
    thrust: string;
    msn: string;
    manuf: string;
    manufDate: string;
    initFh?: string;
    initFc?: string;
    tsn: string;
    csn: string;
    lastOverhaulDate?: string;
    tsnAtLastOverhaul?: string;
    csnAtLastOverhaul?: string;
}
export interface ICreateApuDto {
    type: string;
    msn: string;
    manuf: string;
    manufDate: string;
    initFh?: string;
    initFc?: string;
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
    lastInspDate: string;
    tsnAtLastInsp: string;
    csnAtLastInsp: string;
    nextInspDate: string;
    tsnAtNextInsp: string;
    csnAtNextInsp: string;

    // dependence: string;
    // threshold: string;
}

export interface ICfm56EngineLimit {
    engCsn: string;
    section: string;
    part: string;
    pn: string;
    sn: string;
    csnA: string;
    csnB: string;
    csnC: string;
    csn2C: string;
    csnLimA: string;
    csnLimB: string;
    csnLimC: string;
    csnLim2C: string;
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
}
export interface ILegGear {
    sn: string | null;
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

export interface IGear {
    _id: string;
    pos: string;
    pn: string;
    sn: string;
    tsn: string;
    csn: string;
    lastInspDate: string;
    tsnAtLastInsp: string;
    csnAtLastInsp: string;
    nextInspDate: string;
    tsnAtNextInsp: string;
    csnAtNextInsp: string;
    gearHistory: IGearHistory[];
    limits: IGearLimit[];
}

export interface IGearLimit {
    gearTsn: string;
    gearCsn: string;
    item: string;
    part: string;
    pn: string;
    sn: string;
    instDate: string;
    initTsn: string;
    initCsn: string;
    tsn: string;
    csn: string;
    instCsn: string;
    tsnLim: string;
    csnLim: string;
}

export interface ICreateGearDto {
    pos: string,
    pn: string,
    sn: string,
    initFh: string,
    initFc: string,
    tsn: string,
    csn: string,
    lastInspDate: string,
    tsnAtLastInsp: string,
    csnAtLastInsp: string,
    nextInspDate: string,
    tsnAtNextInsp: string,
    csnAtNextInsp: string,
}

export interface IGearHistory {
    date: string;
    action: string;
    aircraft: string;
    gear: string;
    position: string;
    aircraftTsn: string;
    aircraftCsn: string;
    gearTsn: string;
    gearCsn: string;
    reason: string
}

export interface IHistoryUnit {
    date: string;
    aircraft: string;
    wo: string;
    quantity: number;
    remark: string;
}

export interface IUnit {
    _id: string;
    ata: string;
    pn: string;
    sn: string;
    type: string;
    desc: string;
    grn: string;
    quantity: number;
    eapack: string;
    location: string;
    rack: string;
    shelf: string;
    condition: string;
    lifelimit: string;
    shelflife: string;
    remarks: string;
    usage: IHistoryUnit[];
}