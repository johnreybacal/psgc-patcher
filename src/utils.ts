export const isTenDigitCode = (code: string) => code.length === 10;

export type GeoLevel = "region" | "province" | "city" | "barangay";

export function getGeoLevel(code: string): GeoLevel {
    const isTenOffset = isTenDigitCode(code) ? 1 : 0;

    const regionOffset = 2;
    const provinceOffset = 4 + isTenOffset;
    const cityOffset = 6 + isTenOffset;

    function isZero(offset: number) {
        return parseInt(code.substring(offset)) === 0;
    }

    if (isZero(regionOffset)) {
        return "region";
    }
    if (isZero(provinceOffset)) {
        return "province";
    }
    if (isZero(cityOffset)) {
        return "city";
    }
    return "barangay";
}
