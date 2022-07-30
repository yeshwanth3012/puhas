const { Vehicle } = require("../models/vehicle");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    const vehicles = await Vehicle.find();

    if (!vehicles) {
        res.status(500).json({ success: false });
    }
    res.status(200).send(vehicles);
});

router.get("/:id", async (req, res) => {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
        res.status(500).json({
            message: "The vehicle with given ID was not found",
        });
    }
    res.status(200).send(vehicle);
});

router.post("/", async (req, res) => {
    let vehicle = new Vehicle({
        vehicle_id: req.body.vehicle_id,
        vehicle_name: req.body.vehicle_name,
        vehicle_type: req.body.vehicle_type,
        vehicle_number: req.body.vehicle_number,
        vehicle_capacity: req.body.vehicle_capacity,
        vehicle_status: req.body.vehicle_status,

        current_facility_id: req.body.current_facility_id,
        origin_facility_id: req.body.origin_facility_id,
        destination_facility_id: req.body.destination_facility_id,
    });
    vehicle = await vehicle.save();
    if (!vehicle) return res.status(404).send("the vehicle cannot be created!");

    res.send(vehicle);
});

router.put("/:id", async (req, res) => {
    const vehicle = await Vehicle.findByIdAndUpdate(
        req.params.id,
        {
            vehicle_id: req.body.vehicle_id,
            vehicle_name: req.body.vehicle_name,
            vehicle_type: req.body.vehicle_type,
            vehicle_number: req.body.vehicle_number,
            vehicle_capacity: req.body.vehicle_capacity,
            vehicle_status: req.body.vehicle_status,

            current_facility_id: req.body.current_facility_id,
            origin_facility_id: req.body.origin_facility_id,
            destination_facility_id: req.body.destination_facility_id,
        },
        { new: true }
    );

    if (!vehicle) return res.status(400).send("the vehicle cannot be created!");

    res.send(vehicle);
});

router.delete("/:id", (req, res) => {
    Vehicle.findByIdAndRemove(req.params.id)
        .then((vehicle) => {
            if (vehicle) {
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
