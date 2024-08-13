import { ModelStatic } from "sequelize";
import { Callback } from "./callback";
import { Definition } from "./definition";
export class Sequelize implements Callback<ModelStatic<any>> {
    model: ModelStatic<any>;
    definition: Definition;

    setModel(model: ModelStatic<any>, definition: Definition) {
        this.model = model;
        this.definition = definition;
    }

    async getByCode(code: string) {
        return await this.model.findOne({
            where: { [this.definition.code]: code },
        });
    }

    async rename(code: string, name: string) {
        return await this.model.update(
            {
                [this.definition.name]: name,
            },
            {
                where: {
                    [this.definition.code]: code,
                },
            }
        );
    }
}
