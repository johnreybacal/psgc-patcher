export interface Callback<T> {
    model: T;
    setModel(model: T);
    getByCode(code: string): Promise<any>;
    rename(code: string, name: string): Promise<any>;
}
