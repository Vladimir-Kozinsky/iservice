export declare class CreateLegDto {
    readonly aircraft: string;
    readonly engines: [
        {
            msn: string;
            engineTsn: string;
            engineCsn: string;
        }
    ];
    readonly apu: string;
    readonly depDate: string;
    readonly flightNumber: string;
    readonly from: string;
    readonly to: string;
    readonly blockOff: string;
    readonly takeOff: string;
    readonly landing: string;
    readonly blockOn: string;
    readonly flightTime: string;
    readonly blockTime: string;
    readonly fh: string;
    readonly fc: string;
}
