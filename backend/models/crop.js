const mongoose = require("mongoose");

const cropSchema = mongoose.Schema({
    crop_id: { type: Number, required: true, unique: true },
    crop_name: { type: String, required: true },

    crop_category: { type: String, required: true },
    crop_farm_id: { type: Number, required: true },
});

cropSchema.virtual("id").get(function () {
    return this._id.toHexString();
});

cropSchema.set("toJSON", {
    virtuals: true,
});

exports.Crop = mongoose.model("Crops", cropSchema);
