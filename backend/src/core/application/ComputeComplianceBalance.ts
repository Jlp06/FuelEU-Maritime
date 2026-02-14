// ComputeComplianceBalance.ts

export interface ComplianceResult {
    target: number;          // gCO2eq/MJ
    actual: number;          // gCO2eq/MJ
    fuelMassTonnes: number;  // tonnes
    lcvMJPerGram: number;    // MJ/g (from Annex II)
    energyMJ: number;        // MJ
    cb: number;              // Compliance Balance (gCO2eq)
    status: "SURPLUS" | "DEFICIT";
}

export class ComputeComplianceBalance {

    private readonly target: number;

    /**
     * Default FuelEU 2025 target
     * FuelEU Annex IV / Article 4 reduction trajectory
     */
    constructor(target: number = 89.3368) {
        this.target = target;
    }

    /**
     * Compute compliance balance according to FuelEU methodology
     *
     * Annex I & Annex IV compliant:
     * Energy = Mass × LCV
     * CB = (Target − Actual) × Energy
     *
     * @param actualIntensity gCO2eq/MJ
     * @param fuelMassTonnes tonnes of fuel consumed
     * @param lcvMJPerGram Lower Calorific Value (MJ/g) from Annex II
     */
    execute(
        actualIntensity: number,
        fuelMassTonnes: number,
        lcvMJPerGram: number
    ): ComplianceResult {

        if (actualIntensity <= 0) {
            throw new Error("Actual GHG intensity must be positive");
        }

        if (fuelMassTonnes <= 0) {
            throw new Error("Fuel mass must be positive");
        }

        if (lcvMJPerGram <= 0) {
            throw new Error("LCV must be positive");
        }

        /**
         * FuelEU Annex I energy calculation
         *
         * Convert tonnes → grams
         * 1 tonne = 1,000,000 grams
         */
        const fuelMassGrams = fuelMassTonnes * 1_000_000;

        /**
         * Energy in MJ according to FuelEU Annex I
         */
        const energyMJ = fuelMassGrams * lcvMJPerGram;

        /**
         * Compliance Balance calculation
         * Annex IV compliant
         */
        const rawCB = (this.target - actualIntensity) * energyMJ;

        /**
         * Apply FuelEU rounding best practice
         * (precision handling for reporting systems)
         */
        const cb = Math.round(rawCB);

        return {
            target: this.target,
            actual: actualIntensity,
            fuelMassTonnes,
            lcvMJPerGram,
            energyMJ,
            cb,
            status: cb >= 0 ? "SURPLUS" : "DEFICIT"
        };
    }
}