const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    order_id: { type: String, required: true, unique: true },
    order_user_id: { type: String, required: true },
    order_product_id: { type: String, required: true },

    order_quantity: { type: Number, required: true },
    order_price: { type: Number, required: true },
    order_payment_mode: { type: String, required: true },
    order_discount: { type: String, required: true },
    order_status: { type: String, required: true },
    order_created_at: { type: Date, required: true },
    order_delivery_time: { type: Date, required: true },
});

orderSchema.virtual("id").get(function () {
    return this._id.toHexString();
});
orderSchema.set("toJSON", {
    virtuals: true,
});

exports.Order = mongoose.model("Order", orderSchema);
