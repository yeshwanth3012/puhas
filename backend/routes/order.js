const { Order } = require("../models/order");
const { OrderItem } = require("../models/order-item");
const express = require("express");
const router = express.Router();

router.get(`/`, async (req, res) => {
    const orderList = await Order.find()
        .populate("user", "name")
        .sort({ dateOrdered: -1 });

    if (!orderList) {
        res.status(500).json({ success: false });
    }
    res.send(orderList);
});

router.get(`/:id`, async (req, res) => {
    const order = await Order.findById(req.params.id)
        .populate("user", "name")
        .populate({
            path: "orderItems",
            populate: { path: "product", populate: "category" },
        });

    if (!order) {
        res.status(500).json({ success: false });
    }
    res.send(order);
});

router.post(`/`, async (req, res) => {
    const orderItemsIds = Promise.all(
        req.body.orderItems.map(async (orderItem) => {
            let newOrdersItem = new OrderItem({
                quantity: orderItem.quantity,
                product: orderItem.product,
            });
            newOrdersItem = await newOrdersItem.save();
            return newOrdersItem._id;
        })
    );

    const orderItemsIdsResolved = await orderItemsIds;

    const totalPrice = await Promise.all(
        orderItemsIdsResolved.map(async (orderItemId) => {
            const orderItem = await OrderItem.findById(orderItemId).populate(
                "product",
                "price"
            );
            const totalPrice = orderItem.product.price * orderItem.quantity;
            return totalPrice;
        })
    );

    const totalPriceSum = totalPrice.reduce((a, b) => a + b, 0);

    let order = new Order({
        order_id: req.body.order_id,
        order_user_id: req.body.order_user_id,
        order_product_id: req.body.order_product_id,
        order_quantity: req.body.order_quantity,
        order_price: totalPriceSum,
        order_payment_mode: req.body.order_payment_mode,
        order_discount: req.body.order_discount,
        order_status: req.body.order_status,
        order_created_at: req.body.order_created_at,
        order_delivery_time: req.body.order_delivery_time,
        orderItems: orderItemsIdsResolved,
    });

    order = await order.save();
    if (!order) return res.status(404).send("the order cannot be created!");

    res.send(order);
});

router.put("/:id", async (req, res) => {
    const order = await Order.findByIdAndUpdate(
        req.params.id,
        {
            order_id: req.body.order_id,
            order_user_id: req.body.order_user_id,
            order_product_id: req.body.order_product_id,
            order_quantity: req.body.order_quantity,
            order_price: totalPriceSum,
            order_payment_mode: req.body.order_payment_mode,
            order_discount: req.body.order_discount,
            order_status: req.body.order_status,
            order_created_at: req.body.order_created_at,
            order_delivery_time: req.body.order_delivery_time,
            orderItems: orderItemsIdsResolved,
        },
        { new: true }
    );

    if (!order) return res.status(400).send("the order cannot be created!");

    res.send(order);
});

router.delete(`/:id`, (req, res) => {
    Order.findByIdAndRemove(req.params.id)
        .then(async (order) => {
            if (order) {
                await order.orderItems.map(async (orderItem) => {
                    await OrderItem.findByIdAndRemove(orderItem);
                });
                return res
                    .status(200)
                    .json({ success: true, message: "the order is deleted!" });
            } else {
                return res
                    .status(404)
                    .json({ success: false, message: "order not found" });
            }
        })
        .catch((err) => {
            return res.status(400).json({ success: false, error: err });
        });
});

router.get("/get/totalsales", async (req, res) => {
    const totalSales = await Order.aggregate([
        { $group: { _id: null, totalsales: { $sum: "$totalPrice" } } },
    ]);

    if (!totalSales) {
        return res.status(400).send("The order sales cannot be generated");
    }
    res.send({ totalsales: totalSales.pop().totalsales });
});

router.get(`/get/count`, async (request, response) => {
    const orderCount = await Order.countDocuments((count) => count);

    if (!orderCount) {
        response.status(500).json({ success: false });
    }
    response.send({ orderCount: orderCount });
});

router.get(`/get/userorders/:userid`, async (req, res) => {
    const userOrderList = await Order.find({ user: req.params.userid })
        .populate({
            path: "orderItems",
            populate: { path: "product", populate: "category" },
        })
        .sort({ dateOrdered: -1 });

    if (!userOrderList) {
        res.status(500).json({ success: false });
    }
    res.send(userOrderList);
});

module.exports = router;
