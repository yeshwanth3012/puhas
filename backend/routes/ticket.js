const { Ticket } = require("../models/ticket");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    const tickets = await Ticket.find();
    res.send(tickets);
});

router.get("/:id", async (req, res) => {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
        res.status(500).json({
            message: "The ticket with given ID was not found",
        });
    }
    res.status(200).send(ticket);
});

router.post("/", async (req, res) => {
    let ticket = new Ticket({
        ticket_id: req.body.ticket_id,
        ticket_type: req.body.ticket_type,
        ticket_status: req.body.ticket_status,
        ticket_created_at: req.body.ticket_created_at,
        ticket_order_id: req.body.ticket_order_id,
        ticket_user_id: req.body.ticket_user_id,
        ticket_vehicle_id: req.body.ticket_vehicle_id,
        ticket_wallet_id: req.body.ticket_wallet_id,
    });
    ticket = await ticket.save();
    if (!ticket) return res.status(404).send("the ticket cannot be created!");

    res.send(ticket);
});

router.put("/:id", async (req, res) => {
    const ticket = await Ticket.findByIdAndUpdate(
        req.params.id,
        {
            ticket_id: req.body.ticket_id,
            ticket_type: req.body.ticket_type,
            ticket_status: req.body.ticket_status,
            ticket_created_at: req.body.ticket_created_at,
            ticket_order_id: req.body.ticket_order_id,
            ticket_user_id: req.body.ticket_user_id,
            ticket_vehicle_id: req.body.ticket_vehicle_id,
            ticket_wallet_id: req.body.ticket_wallet_id,
        },
        { new: true }
    );
    if (!ticket) return res.status(404).send("the ticket cannot be updated!");

    res.send(ticket);
});

router.delete("/:id", (req, res) => {
    Ticket.findByIdAndRemove(req.params.id)
        .then((ticket) => {
            if (ticket) {
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
