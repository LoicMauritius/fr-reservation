import { Schema, model, models, Document } from "mongoose";

export interface OptionType {
    id_Option: number;
    wording: string;
    price: number;
}

export interface Option extends OptionType, Document {}

const OptionSchema = new Schema<Option>({
    id_Option: { type: Number, required: true, unique: true },
    wording: { type: String, required: true },
    price: { type: Number, required: true }
});

export default function getOptionModel() {
    if (models.Option) {
        return models.Option;
    }

    return model<Option>('Option', OptionSchema);
}