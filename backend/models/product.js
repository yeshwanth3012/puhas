const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    product_id: { type: String, required: true, unique: true },
    product_name: { type: String, required: true },

    product_crop_id: { type: String, required: true },
    product_type: { type: String, required: true },

    product_price: { type: Number, required: true },
    product_status: { type: String, required: true },

    product_farm_id: { type: String, required: true },
    product_distrib_center: { type: String, required: true },
    isFeatured: { type: Boolean, required: true },
    numReiews: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    brand: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true },
});

productSchema.virtual("id").get(function () {
    return this._id.toHexString();
});
productSchema.set("toJSON", {
    virtuals: true,
});
exports.Product = mongoose.model("Product", productSchema);
