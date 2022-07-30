const { Crop } = require("../models/crop");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    const cropList = await Crop.find();

    if (!cropList) {
        res.status(500).json({ success: false });
    }
    res.status(200).send(cropList);
});

router.get("/:id", async (req, res) => {
    const crop = await Crop.findById(req.params.id);

    if (!crop) {
        res.status(500).json({
            message: "The crop with given ID was not found",
        });
    }
    res.status(200).send(crop);
});

router.post("/", async (req, res) => {
    let crop = new Crop({
        crop_id: req.body.crop_id,
        crop_name: req.body.crop_name,
        crop_category: req.body.crop_category,
        crop_farm_id: req.body.crop_farm_id,
    });
    crop = await crop.save();
    if (!crop) return res.status(404).send("the crop cannot be created!");

    res.send(crop);
});

router.put("/:id", async (req, res) => {
    const crop = await Crop.findByIdAndUpdate(
        req.params.id,
        {
            crop_id: req.body.crop_id,
            crop_name: req.body.crop_name,
            crop_category: req.body.crop_category,
            crop_farm_id: req.body.crop_farm_id,
        },
        { new: true }
    );

    if (!crop) return res.status(400).send("the crop cannot be created!");

    res.send(crop);
});

router.delete("/:id", (req, res) => {
    Crop.findByIdAndRemove(req.params.id)
        .then((crop) => {
            if (crop) {
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
