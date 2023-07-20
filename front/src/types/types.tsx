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
    apu: [];
    legs: [];
    limits: [];
}