export class BankSurplus {
    execute(cb: number): number {
        if (cb <= 0) {
            throw new Error("Cannot bank zero or negative compliance balance");
        }

        return cb;
    }
}
