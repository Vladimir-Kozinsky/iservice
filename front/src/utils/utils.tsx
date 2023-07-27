import { IEngine } from "../types/types";

export const sortEngines = (enginesArr: IEngine[]) => {
    const engines = [...enginesArr];
    if (engines.length < 2) return engines;
    const sortedEngines = engines.sort((engineA: IEngine, engineB: IEngine) => {
        if (engineB.position && engineA.position) return engineA.position - engineB.position
        return -1
    })
    return sortedEngines
}


export const subtractFH = (from: string | null | undefined, to: string | null | undefined): string => {
    const strToMM = (timeStr: string): number => {
        const tempArr = timeStr.split(":");
        const hh: number = +tempArr[0] * 60;
        const mm: number = +tempArr[1];
        return hh + mm
    }
    const mmToStr = (value: number): string => {
        const hh: number = Math.floor(value / 60);
        const mm: number = Math.abs(value % 60);
        const corrMm = mm > 10 ? mm : '0' + mm
        return `${hh}:` + corrMm
    }
    if (from && to) {
        const tsnNum = strToMM(from);
        const tsnAtlastOverhaulNum = strToMM(to);
        return mmToStr(tsnNum - tsnAtlastOverhaulNum);
    } else {
        return '';
    }
}


export const subtractFC = (from: string | null | undefined, to: string | null | undefined): string => {
    if (from && to) {
        return `${+from - +to}`
    }
    return '';
}

export const subtractDatesFromNow = (from: string | null | undefined): string => {
    if (from) {
        const fromDate = new Date(from);
        const currentDate = new Date();
        const ms = +fromDate - +currentDate;
        const days = Math.ceil(ms / 1000 / 3600 / 24);
        return `${days}`;
    }
    return '';
}

export const checkFHFormat = (str = ''): boolean => {
    const num = parseInt(str.replace(/[^\d]/g, ''))
    if (num.toString().length !== str.length - 1) return false
    if (str[str.length - 3] !== ':') return false;
    if (str[str.length - 2] > '5') return false;
    if (str.length < 4) return false
    if (typeof +str[str.length - 4] !== "number") return false
    if (str.length > 9) return false;
    return true
}

export const checkFCFormat = (str = ''): boolean => {
    const num = parseInt(str.replace(/[^\d]/g, ''))
    if (num.toString().length !== str.length) return false
    if (num > 999999) return false
    if (num < 0) return false
    return true
}
