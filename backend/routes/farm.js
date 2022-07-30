const { Farm } = require("../models/farm");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    const farmList = await Farm.find();

    if (!farmList) {
        res.status(500).json({ success: false });
    }
    res.status(200).send(farmList);
});

router.get("/:id", async (req, res) => {
    const farm = await Farm.findById(req.params.id);

    if (!farm) {
        res.status(500).json({
            message: "The farm with given ID was not found",
        });
    }
    res.status(200).send(farm);
});

router.post("/", async (req, res) => {
    let farm = new Farm({
        farm_id: req.body.farm_id,
        farm_name: req.body.farm_name,
        farm_address: req.body.farm_address,
        farm_city: req.body.farm_city,
        farm_state: req.body.farm_state,
        farm_zip: req.body.farm_zip,
        farm_location: req.body.farm_location,
        farm_country: req.body.farm_country,
        farm_phone: req.body.farm_phone,
        farm_email: req.body.farm_email,
    });
    farm = await farm.save();
    if (!farm) return res.status(404).send("the farm cannot be created!");

    res.send(farm);
});

router.put("/:id", async (req, res) => {
    const farm = await Farm.findByIdAndUpdate(
        req.params.id,
        {
            farm_id: req.body.farm_id,
            farm_name: req.body.farm_name,
            farm_address: req.body.farm_address,
            farm_city: req.body.farm_city,
            farm_state: req.body.farm_state,
            farm_zip: req.body.farm_zip,
            farm_location: req.body.farm_location,
            farm_country: req.body.farm_country,
            farm_phone: req.body.farm_phone,
            farm_email: req.body.farm_email,
        },
        { new: true }
    );

    if (!farm) return res.status(400).send("the farm cannot be created!");

    res.send(farm);
});

router.delete("/:id", (req, res) => {
    Farm.findByIdAndRemove(req.params.id)
        .then((farm) => {
            if (farm) {
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
