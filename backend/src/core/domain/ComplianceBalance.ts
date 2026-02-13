export interface ComplianceBalance {
    shipId: string;
    year: number;
    energyMJ: number;
    actualIntensity: number;
    targetIntensity: number;
    balance: number; // gCO2eq
}
