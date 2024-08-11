import readXlsxFile from "read-excel-file/node";
import { ParseWithoutSchemaOptions, Row } from "read-excel-file/types";

const filePath: string = "./data/PSGC-2Q-2024-Summary-of-Changes.xlsx";
const read = async () => {
    const options: ParseWithoutSchemaOptions = {
        sheet: "2001-present",
    };
    const rows = await readXlsxFile(filePath, options);

    const noUpdates = [];
    const releases = [];
    let previousRow: Row;

    for (const row of rows) {
        const firstColumn = row[0]?.toString();
        if (!firstColumn) {
            continue;
        }

        if (
            firstColumn.startsWith("*") &&
            firstColumn.endsWith("(NO UPDATES)")
        ) {
            noUpdates.push(firstColumn);
        } else if (firstColumn === "Region/Province/Municipal/Bgy. Name") {
            releases.push(previousRow[0]);
        }
        previousRow = row;
    }

    console.log(noUpdates);
    console.log(releases);
};

read();
