import * as actions from "./actions";
import { Callback } from "./callbacks/callback";
import { Entry } from "./types";

export class Patcher {
    private changes: Entry[];
    private callback: Callback<any>;

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
            if (actions.rename.includes(change.type)) {
                await this.callback.rename(change.oldCode, change.name);
            }
        }
    }
}
