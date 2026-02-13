export interface PoolMemberInput {
    shipId: string;
    cb: number;
}

export interface PoolMemberResult {
    shipId: string;
    cbBefore: number;
    cbAfter: number;
}

export class CreatePool {

    execute(members: PoolMemberInput[]): PoolMemberResult[] {

        const total = members.reduce((sum, m) => sum + m.cb, 0);

        if (total < 0) {
            throw new Error("Pool total must be >= 0");
        }

        // Clone members and prepare tracking
        const working = members.map(m => ({
            shipId: m.shipId,
            cbBefore: m.cb,
            cbAfter: m.cb
        }));

        const surpluses = working
            .filter(m => m.cbAfter > 0)
            .sort((a, b) => b.cbAfter - a.cbAfter);

        const deficits = working
            .filter(m => m.cbAfter < 0)
            .sort((a, b) => a.cbAfter - b.cbAfter);

        for (const deficit of deficits) {

            for (const surplus of surpluses) {

                if (deficit.cbAfter >= 0) break;
                if (surplus.cbAfter <= 0) continue;

                const transfer = Math.min(
                    surplus.cbAfter,
                    Math.abs(deficit.cbAfter)
                );

                surplus.cbAfter -= transfer;
                deficit.cbAfter += transfer;
            }

            if (deficit.cbAfter < 0) {
                throw new Error("Deficit ship cannot exit worse");
            }
        }

        return working;
    }
}