const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema({
    ticket_id: { type: String, required: true, unique: true },
    ticket_type: { type: String, required: true },

    ticket_status: { type: String, required: true },
    ticket_created_at: { type: Date, required: true },

    ticket_order_id: { type: String, required: true },
    ticket_user_id: { type: String, required: true },
    ticket_vehicle_id: { type: String, required: true },
    ticket_wallet_id: { type: String, required: true },
});

ticketSchema.virtual("id").get(function () {
    return this._id.toHexString();
});

ticketSchema.set("toJSON", {
    virtuals: true,
});

exports.Ticket = mongoose.model("Crops", ticketSchema);
