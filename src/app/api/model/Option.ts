import { Schema, model, models} from "mongoose";

const OptionSchema = new Schema({
    id_Option: Number,
    wording: String,
    price: Number
})

export default function getOptionModel() {
    if (models.Option) {
      return models.Option;
    }
  
    return model('Option', OptionSchema);
}