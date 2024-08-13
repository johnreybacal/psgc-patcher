import readXlsxFile from "read-excel-file/node";
import { ParseWithoutSchemaOptions } from "read-excel-file/types";
import { Entry, Index, Row } from "./types";

export class Reader {
    /**
     * Summary of Changes grouped into release dates
     */
    changes: Record<string, Entry[]>;

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
                const entry: Entry = {
                    name: row[Index.name] as string,
                    type: row[Index.type] as string,
                    newCode: row[Index.newCode] as string,
                    motherUnitOldName: row[Index.motherUnitOldName] as string,
                    oldCode: row[Index.oldCode] as string,
                    description: row[Index.description] as string,
                };
                changes[release]?.push(entry);
            }
            previousRow = row;
        }

        return this;
    }

    /**
     * Get the changes with the given range (inclusive)
     * @param from Title to start from
     * @param to Last title to include (defaults to latest)
     * @returns Changes from start to end
     */
    getChangesFrom(from: string, to?: string) {
        const releases = Object.keys(this.changes);
        const changes: Entry[] = [];

        let isInRange = false;
        for (const release of releases) {
            if (release === from) {
                isInRange = true;
            }

            if (isInRange) {
                changes.push(...this.changes[release]);
            }

            if (release === to) {
                break;
            }
        }

        return changes;
    }
}
