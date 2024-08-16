export interface Definition {
    tableName: string;
    id?: string;
    oldCode?: string;
    code: string;
    name: string;
}

/**
 * Region
 */
export type Region = Definition;

/**
 * Province
 * - can reference region
 */
export interface Province extends Region {
    regionId?: string;
}

/**
 * City
 * - can reference province
 */
export interface City extends Province {
    provinceId?: string;
}

export type Municipality = City;

export interface SubMunicipality extends Definition {
    cityId?: string;
}

export interface Barangay extends Definition {
    cityId?: string;
    municipalityId?: string;
    subMunicipalityId?: string;
}
