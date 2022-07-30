const { Facility } = require("../models/facility");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    const facilityList = await Facility.find();
    if (!facilityList) {
        res.status(500).json({ success: false });
    }
    res.send(facilityList);
});

router.get("/:id", async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send("Invalid facility ID");
    }
    const facility = await Facility.findById(req.params.id);
    if (!facility) {
        res.status(500).json({ success: false });
    }
    res.send(facility);
});

router.post("/", async (req, res) => {
    const facility = new Facility({
        facility_id: req.body.facility_id,
        facility_name: req.body.facility_name,
        facility_type: req.body.facility_type,
        facility_address: req.body.facility_address,
        facility_city: req.body.facility_city,
        facility_state: req.body.facility_state,
        facility_zip: req.body.facility_zip,
        facility_location: req.body.facility_location,
        facility_country: req.body.facility_country,
        facility_phone: req.body.facility_phone,
        facility_email: req.body.facility_email,
        facility_status: req.body.facility_status,
    });
    const newFacility = await facility.save();
    if (!newFacility) {
        res.status(500).json({ success: false });
    }
    res.send(newFacility);
});

router.put("/:id", async (req, res) => {
    const facility = await Facility.findByIdAndUpdate(
        req.params.id,
        {
            facility_id: req.body.facility_id,
            facility_name: req.body.facility_name,
            facility_type: req.body.facility_type,
            facility_address: req.body.facility_address,
            facility_city: req.body.facility_city,
            facility_state: req.body.facility_state,
            facility_zip: req.body.facility_zip,
            facility_location: req.body.facility_location,
            facility_country: req.body.facility_country,
            facility_phone: req.body.facility_phone,
            facility_email: req.body.facility_email,
            facility_status: req.body.facility_status,
        },
        {
            new: true,
        }
    );
    if (!facility) {
        res.status(500).json({ success: false });
    }
    res.send(facility);
});

router.delete("/:id", async (req, res) => {
    const facility = await Facility.findByIdAndRemove(req.params.id);
    if (!facility) {
        res.status(500).json({ success: false });
    }
    res.send(facility);
});

module.exports = router;
