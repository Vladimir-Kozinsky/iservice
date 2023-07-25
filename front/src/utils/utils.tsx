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

