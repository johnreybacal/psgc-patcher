export const isTenDigitCode = (code: string) => code.length === 10;

export type GeoLevel = "Region" | "Province" | "City" | "Barangay";

export function getGeoLevel(code: string): GeoLevel {
    const isTenOffset = isTenDigitCode(code) ? 1 : 0;

    const regionOffset = 2;
    const provinceOffset = 4 + isTenOffset;
    const cityOffset = 6 + isTenOffset;

    if (parseInt(code.substring(regionOffset)) === 0) {
        return "Region";
    }
    if (parseInt(code.substring(provinceOffset)) === 0) {
        return "Province";
    }
    if (parseInt(code.substring(cityOffset)) === 0) {
        return "City";
    }
    return "Barangay";
}
