export interface ComplianceResult {
    target: number;
    actual: number;
    energy: number;
    cb: number;
    status: "SURPLUS" | "DEFICIT";
}

export class ComputeComplianceBalance {
    private readonly target: number;

    constructor(target: number = 89.3368) {
        this.target = target;
    }

    execute(actualIntensity: number, fuelConsumptionTonnes: number): ComplianceResult {

        if (fuelConsumptionTonnes <= 0) {
            throw new Error("Fuel consumption must be positive");
        }

        if (actualIntensity <= 0) {
            throw new Error("Actual intensity must be positive");
        }

        const energy = fuelConsumptionTonnes * 41000;

        const cb = (this.target - actualIntensity) * energy;

        return {
            target: this.target,
            actual: actualIntensity,
            energy,
            cb,
            status: cb >= 0 ? "SURPLUS" : "DEFICIT"
        };
    }
}