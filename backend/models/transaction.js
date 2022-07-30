const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema({
    transaction_id: { type: String, required: true, unique: true },
    transaction_type: { type: String, required: true },

    transaction_amount: { type: Number, required: true },
    transaction_status: { type: String, required: true },
    transaction_created_at: { type: Date, required: true },

    transaction_order_id: { type: String, required: true },
    transaction_user_id: { type: String, required: true },
    transaction_vehicle_id: { type: String, required: true },
    transaction_wallet_id: { type: String, required: true },
});

transactionSchema.virtual("id").get(function () {
    return this._id.toHexString();
});

transactionSchema.set("toJSON", {
    virtuals: true,
});

exports.Transaction = mongoose.model("Crops", transactionSchema);
