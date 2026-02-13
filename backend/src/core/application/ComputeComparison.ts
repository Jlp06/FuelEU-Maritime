export interface ComparisonResult {
    baseline: number;
    comparison: number;
    percentDiff: number;
    compliant: boolean;
}

export class ComputeComparison {

    private readonly target = 89.3368;

    execute(baseline: number, comparison: number): ComparisonResult {

        if (baseline <= 0) {
            throw new Error("Baseline must be positive");
        }

        const percentDiff = ((comparison / baseline) - 1) * 100;

        return {
            baseline,
            comparison,
            percentDiff,
            compliant: comparison <= this.target
        };
    }
}