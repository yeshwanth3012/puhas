const mongoose = require("mongoose");

const vendorSchema = mongoose.Schema({
    vendor_id: { type: String, required: true, unique: true },
    vendor_type: { type: String, required: true },

    billing_interval: { type: String, required: true },
    product_type: { type: String, required: true },

    service_location: { type: String, required: true },
    account_manager_id: { type: String, required: true },

    storage_facilities: { type: Array, required: true },
});

vendorSchema.virtual("id").get(function () {
    return this._id.toHexString();
});

vendorSchema.set("toJSON", {
    virtuals: true,
});

exports.Vendor = mongoose.model("Crops", vendorSchema);
