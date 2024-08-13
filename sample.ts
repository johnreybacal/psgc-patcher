import { Reader } from "./src/reader";
import { Index } from "./src/types";
const reader = new Reader();

reader.read("./data/PSGC-2Q-2024-Summary-of-Changes.xlsx").then((reader) => {
    console.log(
        reader
            .getChangesFrom(
                "October - December 2004 Updates",
                "July - September 2005 Updates"
            )
            .map((row) => row[Index.name])
    );
    console.log(
        reader
            .getChangesFrom(
                "July - September 2019 Updates",
                "January - March 2020"
            )
            .map((row) => row[Index.name])
    );
    console.log(
        reader.getChangesFrom("April 2024").map((row) => row[Index.name])
    );

    const types: Set<string> = new Set(
        reader
            .getChangesFrom("January - March 2001 Updates")
            .map((row) => row[Index.type]?.toString())
            .sort((a, b) => a.localeCompare(b))
    );

    console.log(types);
});

// reader
//     .read("./data/PSGC-2Q-2024-Summary-of-Changes.xlsx")
//     .then(({ changes }) => {
//         console.log(
//             "October - December 2004 Updates",
//             changes["October - December 2004 Updates"].map(
//                 (row) => row[Index.name]
//             )
//         );
//         console.log(
//             "July - September 2005 Updates",
//             changes["July - September 2005 Updates"].map(
//                 (row) => row[Index.name]
//             )
//         );
//         console.log(
//             "January - March 2006 Updates",
//             changes["January - March 2006 Updates"].map(
//                 (row) => row[Index.name]
//             )
//         );
//         console.log(
//             "July - September 2006 Updates",
//             changes["July - September 2006 Updates"].map(
//                 (row) => row[Index.name]
//             )
//         );
//         console.log(
//             "January to March 2024",
//             changes["January to March 2024"].map((row) => row[Index.name])
//         );
//     });
