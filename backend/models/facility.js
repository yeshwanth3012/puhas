const mongoose = require("mongoose");

const facilityScheme = mongoose.Schema({
    facility_id: { type: String, required: true, unique: true },
    facility_name: { type: String, required: true },

    facility_type: { type: String, required: true },

    facility_address: { type: String, required: true },
    facility_city: { type: String, required: true },
    facility_state: { type: String, required: true },
    facility_zip: { type: String, required: true },
    facility_location: { type: String, required: true },
    facility_country: { type: String, required: true },

    facility_phone: { type: String, required: true },
    facility_email: { type: String, required: true },

    facility_status: { type: String, required: true },
});

facilityScheme.virtual("id").get(function () {
    return this._id.toHexString();
});

facilityScheme.set("toJSON", {
    virtuals: true,
});

exports.Facility = mongoose.model("Crops", facilityScheme);
