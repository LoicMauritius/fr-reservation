import { Schema, model, models} from "mongoose";

export const Option = {
    id_Option: Number,
    wording: String,
    price: Number
}
const OptionSchema = new Schema(Option);

export default function getOptionModel() {
    if (models.Option) {
        return models.Option;
    }
  
    return model('Option', OptionSchema);
}