export const sortEngines = (engines: any) => {
    const sortedEngines = engines.sort((engineA: any, engineB: any) => engineA.pos - engineB.pos);
    return sortedEngines;
}