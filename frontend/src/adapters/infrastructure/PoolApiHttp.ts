const API_URL = "http://localhost:4000";

export interface PoolMemberInput {
    shipId: string;
    cb: number;
}

export interface PoolMemberResult {
    shipId: string;
    cbBefore: number;
    cbAfter: number;
}

export interface PoolResult {
    members: PoolMemberResult[];
}

export class PoolApiHttp {

    async createPool(
        year: number,
        members: PoolMemberInput[]
    ): Promise<PoolResult> {

        const res = await fetch(`${API_URL}/pools`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ year, members })
        });

        if (!res.ok) throw new Error("Pool creation failed");

        return res.json();
    }
}
