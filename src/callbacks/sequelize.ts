import { ModelStatic } from "sequelize";
import { Callback } from "./callback";
export class Sequelize implements Callback<ModelStatic<any>> {
    model: ModelStatic<any>;
    setModel(model: ModelStatic<any>) {
        this.model = model;
    }
    async getByCode(code: string) {
        return await this.model.findOne({ where: { code: code } });
    }
    async rename(code: string, name: string) {
        return await this.model.update(
            {
                name: name,
            },
            {
                where: {
                    code: code,
                },
            }
        );
    }
}
