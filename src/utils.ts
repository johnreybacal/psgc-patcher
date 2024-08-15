export const isTenDigitCode = (code: string) => code.length === 10;

export type GeoLevel = "region" | "province" | "city" | "barangay";

export function getGeoLevel(code: string): GeoLevel {
    const isTenOffset = isTenDigitCode(code) ? 1 : 0;

    const regionOffset = 2;
    const provinceOffset = 4 + isTenOffset;
    const cityOffset = 6 + isTenOffset;

    if (parseInt(code.substring(regionOffset)) === 0) {
        return "region";
    }
    if (parseInt(code.substring(provinceOffset)) === 0) {
        return "province";
    }
    if (parseInt(code.substring(cityOffset)) === 0) {
        return "city";
    }
    return "barangay";
}
