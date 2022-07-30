const mongoose = require("mongoose");

const farmSchema = mongoose.Schema({
    farm_id: { type: String, required: true, unique: true },
    farm_name: { type: String, required: true },

    farm_address: { type: String, required: true },
    farm_city: { type: String, required: true },
    farm_state: { type: String, required: true },
    farm_zip: { type: String, required: true },
    farm_location: { type: String, required: true },
    farm_country: { type: String, required: true },

    farm_phone: { type: String, required: true },
    farm_email: { type: String, required: true },

    farm_created_at: { type: Date, required: true },
});

farmSchema.virtual("id").get(function () {
    return this._id.toHexString();
});
farmSchema.set("toJSON", {
    virtuals: true,
});
exports.Farm = mongoose.model("Product", farmSchema);
