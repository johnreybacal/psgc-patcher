import * as actions from "./actions";
import { Callback } from "./callbacks/callback";
import { Entry } from "./types";
import { getGeoLevel } from "./utils";

export class Patcher {
    private changes: Entry[];
    private callback: Callback<any>;
    private callbacks: {
        region: Callback<any>;
        province: Callback<any>;
        city: Callback<any>;
        barangay: Callback<any>;
    };
    private isSingleTable: boolean;

    setChanges(changes: Entry[]) {
        this.changes = changes;
    }
    setCallback(callback: Callback<any>) {
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
