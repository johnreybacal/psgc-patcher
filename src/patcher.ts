import * as actions from "./actions";
import { Handler } from "./handlers/handler";
import { Entry } from "./types";
import { getGeoLevel } from "./utils";

export class Patcher {
    private changes: Entry[];
    private callback: Handler<any>;
    private callbacks: {
        region: Handler<any>;
        province: Handler<any>;
        city: Handler<any>;
        barangay: Handler<any>;
    };
    private isSingleTable: boolean;

    setChanges(changes: Entry[]) {
        this.changes = changes;
    }
    setCallback(callback: Handler<any>) {
        this.callback = callback;
    }

    /**
     * Apply the series of changes using the callback set
     */
    async apply() {
        if (!this.callback) {
            throw Error("Callback is not defined");
        }
        for await (const change of this.changes) {
            const type = change.type;
            const callback = this.getCallback(change.newCode);

            if (actions.rename.includes(type)) {
                await callback.rename(change.oldCode, change.name);
            } else if (actions.create.includes(type)) {
                await callback.create(change);
            }
        }
    }

    private getCallback(code: string) {
        if (this.isSingleTable) {
            return this.callback;
        } else {
            const geoLevel = getGeoLevel(code);
            return this.callbacks[geoLevel];
        }
    }
}
