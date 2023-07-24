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


