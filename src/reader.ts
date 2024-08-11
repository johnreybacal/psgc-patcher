import readXlsxFile from "read-excel-file/node";
import { ParseWithoutSchemaOptions, Row } from "read-excel-file/types";

enum Index {
    name,
    type,
    newCode,
    motherUnitOldName,
    oldCode,
    description,
}

const reader = {
    /**
     * Reads a Summary of Changes file and gets its contents divided by release dates
     * @param filePath Path to the Summary of Changes file
     * @param sheetName Sheet name (default: 2001-present)
     */
    read: async (filePath: string, sheetName = "2001-present") => {
        const options: ParseWithoutSchemaOptions = {
            sheet: sheetName,
        };
        const rows = await readXlsxFile(filePath, options);

        // Remove the initial rows
        rows.splice(0, 5);

        const noUpdates: string[] = [];
        const releases: string[] = [];
        const changes: Record<string, Row[]> = {};
        let previousRow: Row;
        let release;

        for (const row of rows) {
            const firstColumn = row[Index.name]?.toString();
            if (!firstColumn) {
                continue;
            }

            // No updates
            if (
                firstColumn.startsWith("*") &&
                firstColumn.endsWith("(NO UPDATES)")
            ) {
                noUpdates.push(firstColumn);
            }
            // Is Header, previous row is title of release
            else if (firstColumn === "Region/Province/Municipal/Bgy. Name") {
                releases.push(previousRow[Index.name].toString());

                // Remove the last pushed change from previous release
                // which is the title of this current release (except for first release)
                changes[release]?.pop();

                // Get title from previous row
                release = previousRow[Index.name];

                // Initialize new release
                changes[release] = [];
            } else {
                // Null safety because first row will go here
                changes[release]?.push(row);
            }
            previousRow = row;
        }
    },
};

reader.read("./data/PSGC-2Q-2024-Summary-of-Changes.xlsx");
