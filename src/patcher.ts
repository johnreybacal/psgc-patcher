import readXlsxFile from "read-excel-file/node";
import { ParseWithoutSchemaOptions } from "read-excel-file/types";

const filePath: string = "./data/PSGC-2Q-2024-Summary-of-Changes.xlsx";
const read = async () => {
    const options: ParseWithoutSchemaOptions = {
        sheet: "2001-present",
    };
    const rows = await readXlsxFile(filePath, options);

    console.log(rows.length);
};

read();
