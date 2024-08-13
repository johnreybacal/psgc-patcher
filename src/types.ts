export { Row } from "read-excel-file/types";
export enum Index {
    name,
    type,
    newCode,
    motherUnitOldName,
    oldCode,
    description,
}
export interface Entry {
    name: string;
    type: string;
    newCode: string;
    motherUnitOldName: string;
    oldCode: string;
    description: string;
}
