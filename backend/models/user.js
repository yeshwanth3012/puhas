const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    user_id: { type: String, required: true, unique: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    username: { type: String, required: true },
    user_role: { type: String, required: true },
    created_at: { type: Date, required: true },
    user_email: { type: String, required: true },
    user_contact: { type: String, required: true },
    user_address: { type: String, required: true },
    user_city: { type: String, required: true },
    user_state: { type: String, required: true },
    user_zip: { type: String, required: true },
    user_location: { type: String, required: true },
    user_country: { type: String, required: true },
    user_wallet_id: { type: String, required: true },
    user_reports_to: { type: String, required: true },
    favorite_items: { type: Array, required: true },
});

userSchema.virtual("id").get(function () {
    return this._id.toHexString();
});
userSchema.set("toJSON", {
    virtuals: true,
});

exports.User = mongoose.model("User", userSchema);
