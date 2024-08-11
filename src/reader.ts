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

class Reader {
    /**
     * Summary of Changes grouped into release dates
     */
    changes: Record<string, Row[]>;

    /**
     * Reads a Summary of Changes file and gets its contents divided by release dates
     * @param filePath Path to the Summary of Changes file
     * @param sheetName Sheet name (default: 2001-present)
     */
    async read(filePath: string, sheetName = "2001-present") {
        const options: ParseWithoutSchemaOptions = {
            sheet: sheetName,
        };
        const rows = await readXlsxFile(filePath, options);

        // Remove the initial rows
        rows.splice(0, 5);

        this.changes = {};
        const changes = this.changes;

        const noUpdates: string[] = [];
        const releases: string[] = [];
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

        return changes;
    }
}

const reader = new Reader();
const changes = reader.read("./data/PSGC-2Q-2024-Summary-of-Changes.xlsx");

changes.then((changes) => {
    console.log(
        "October - December 2004 Updates",
        changes["October - December 2004 Updates"].map((row) => row[Index.name])
    );
    console.log(
        "July - September 2005 Updates",
        changes["July - September 2005 Updates"].map((row) => row[Index.name])
    );
    console.log(
        "January - March 2006 Updates",
        changes["January - March 2006 Updates"].map((row) => row[Index.name])
    );
    console.log(
        "July - September 2006 Updates",
        changes["July - September 2006 Updates"].map((row) => row[Index.name])
    );
    console.log(
        "January to March 2024",
        changes["January to March 2024"].map((row) => row[Index.name])
    );
});
