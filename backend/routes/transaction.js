const { Transaction } = require("../models/transaction");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    const transactions = await Transaction.find();
    if (!transactions)
        return res.status(404).send("the transactions cannot be found!");
    res.send(transactions);
});

router.get("/:id", async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction)
        return res
            .status(404)
            .send("the transaction with given ID was not found!");
    res.send(transaction);
});

router.post("/", async (req, res) => {
    let transaction = new Transaction({
        transaction_id: req.body.transaction_id,
        transaction_type: req.body.transaction_type,
        transaction_amount: req.body.transaction_amount,
        transaction_status: req.body.transaction_status,
        transaction_created_at: req.body.transaction_created_at,
        transaction_order_id: req.body.transaction_order_id,
        transaction_vehicle_id: req.body.transaction_vehicle_id,
        transaction_wallet_id: req.body.transaction_wallet_id,
    });
    transaction = await transaction.save();
    if (!transaction)
        return res.status(404).send("the transaction cannot be created!");

    res.send(transaction);
});

router.put("/:id", async (req, res) => {
    const transaction = await Transaction.findByIdAndUpdate(
        req.params.id,
        {
            transaction_id: req.body.transaction_id,
            transaction_type: req.body.transaction_type,
            transaction_amount: req.body.transaction_amount,
            transaction_status: req.body.transaction_status,
            transaction_created_at: req.body.transaction_created_at,
            transaction_order_id: req.body.transaction_order_id,
            transaction_vehicle_id: req.body.transaction_vehicle_id,
            transaction_wallet_id: req.body.transaction_wallet_id,
        },
        {
            new: true,
        }
    );

    if (!transaction)
        return res.status(404).send("the transaction cannot be created!");
    res.send(transaction);
});

router.delete("/:id", (req, res) => {
    Transaction.findByIdAndRemove(req.params.id)
        .then((transaction) => {
            if (transaction) {
                return res.status(200).json({
                    success: true,
                });
            }
        })
        .catch((err) => {
            return res.status(500).json({
                message: err.message,
            });
        });
});

module.exports = router;
