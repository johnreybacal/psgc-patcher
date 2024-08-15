import { Entry } from "../types";
import { Definition } from "./definition";

export interface Handler<T> {
    /**
     * Model that interacts with the database
     */
    model: T;
    /**
     * Definition of structure
     */
    definition: Definition;

    /**
     * Set model and definition
     * @param model
     * @param definition
     */
    setModel(model: T, definition: Definition);

    /**
     * Get record by code
     * @param code
     */
    getByCode(code: string): Promise<any>;

    /**
     * Rename a record
     * @param code
     * @param name
     */
    rename(code: string, name: string): Promise<any>;

    /**
     * Create a record
     */
    create(entry: Entry): Promise<any>;

    /**
     * Delete a barangay
     * @param code
     */
    deleteBarangay(code: string): Promise<any>;
}
