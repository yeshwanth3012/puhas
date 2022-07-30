const mongoose = require("mongoose");

const vehicleSchema = mongoose.Schema({
    vehicle_id: { type: String, required: true, unique: true },
    vehicle_name: { type: String, required: true },
    vehicle_type: { type: String, required: true },
    vehicle_number: { type: String, required: true },
    vehicle_capacity: { type: Number, required: true },
    vehicle_status: { type: String, required: true },

    current_facility_id: { type: String, required: true },
    origin_facility_id: { type: String, required: true },
    destination_facility_id: { type: String, required: true },
});

vehicleSchema.virtual("id").get(function () {
    return this._id.toHexString();
});
vehicleSchema.set("toJSON", {
    virtuals: true,
});

exports.Vehicle = mongoose.model("User", vehicleSchema);
