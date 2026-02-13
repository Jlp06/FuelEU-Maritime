export interface ComplianceResponse {
    target: number;
    actual: number;
    energy: number;
    cb: number;
    status: "SURPLUS" | "DEFICIT";
}
