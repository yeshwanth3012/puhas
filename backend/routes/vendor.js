const { Vendor } = require("../models/vendor");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    const vendors = await Vendor.find();
    if (!vendors) return res.status(404).send("the vendors cannot be found!");
    res.send(vendors);
});

router.get("/:id", async (req, res) => {
    const vendor = await Vendor.findById(req.params.id);

    if (!vendor) {
        res.status(500).json({
            message: "The vendor with the given ID was not found!",
        });
    }
    res.status(200).send(vendor);
});

router.post("/", async (req, res) => {
    let vendor = new Vendor({
        vendor_id: req.body.vendor_id,
        vendor_type: req.body.vendor_type,
        billing_interval: req.body.billing_interval,
        product_type: req.body.product_type,
        service_location: req.body.service_location,
        account_manager_id: req.body.account_manager_id,
        storage_facilities: req.body.storage_facilities,
    });
    vendor = await vendor.save();
    if (!vendor) return res.status(404).send("the vendor cannot be created!");

    res.send(vendor);
});

router.put("/:id", async (req, res) => {
    const vendor = await Vendor.findByIdAndUpdate(
        req.params.id,
        {
            vendor_id: req.body.vendor_id,
            vendor_type: req.body.vendor_type,
            billing_interval: req.body.billing_interval,
            product_type: req.body.product_type,
            service_location: req.body.service_location,
            account_manager_id: req.body.account_manager_id,
            storage_facilities: req.body.storage_facilities,
        },
        { new: true }
    );

    if (!vendor) return res.status(400).send("the vendor cannot be created!");

    res.send(vendor);
});

router.delete("/:id", (req, res) => {
    Vendor.findByIdAndRemove(req.params.id)
        .then((vendor) => {
            if (vendor) {
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
