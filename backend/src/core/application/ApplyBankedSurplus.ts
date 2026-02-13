export class ApplyBankedSurplus {

    execute(deficit: number, availableBank: number, amount: number) {

        if (deficit >= 0) {
            throw new Error("No deficit to apply surplus to");
        }

        if (amount > availableBank) {
            throw new Error("Insufficient banked surplus");
        }

        return {
            cb_after: deficit + amount,
            bank_remaining: availableBank - amount
        };
    }
}
