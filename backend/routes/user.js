const { User } = require("../models/user");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get(`/`, async (req, res) => {
    const userList = await User.find().select("-passwordHash");

    if (!userList) {
        res.status(500).json({ success: false });
    }
    res.send(userList);
});

router.get(`/:id`, async (req, res) => {
    const user = await User.findById(req.params.id).select("-passwordHash");

    if (!user) {
        res.status(500).json({
            message: "The user with given ID was not found",
        });
    }
    res.status(200).send(user);
});

router.post(`/`, async (req, res) => {
    let user = new User({
        user_id: req.body.user_id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        user_role: req.body.user_role,
        created_at: req.body.created_at,
        user_email: req.body.user_email,
        user_contact: req.body.user_contact,
        user_address: req.body.user_address,
        user_city: req.body.user_city,
        user_state: req.body.user_state,
        user_zip: req.body.user_zip,
        user_location: req.body.user_location,
        user_country: req.body.user_country,
        user_wallet_id: req.body.user_wallet_id,
        user_reports_to: req.body.user_reports_to,
        favorite_items: req.body.favorite_items,
    });
    user = await user.save();
    if (!user) return res.status(404).send("the user cannot be created!");

    res.send(user);
});

router.post(`/login`, async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send("The user not found");
    }

    if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        const secret = process.env.secret;
        const token = jwt.sign(
            {
                userId: user.id,
                isAdmin: user.isAdmin,
            },
            secret,
            { expiresIn: "1d" }
        );
        res.status(200).send({ user: user.email, token: token });
    } else {
        res.status(400).send("The Password is wrong!");
    }
});

router.post(`/register`, async (req, res) => {
    let user = new User({
        user_id: req.body.user_id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        user_role: req.body.user_role,
        created_at: req.body.created_at,
        user_email: req.body.user_email,
        user_contact: req.body.user_contact,
        user_address: req.body.user_address,
        user_city: req.body.user_city,
        user_state: req.body.user_state,
        user_zip: req.body.user_zip,
        user_location: req.body.user_location,
        user_country: req.body.user_country,
        user_wallet_id: req.body.user_wallet_id,
        user_reports_to: req.body.user_reports_to,
        favorite_items: req.body.favorite_items,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
    });
    user = await user.save();
    if (!user) return res.status(404).send("the user cannot be created!");

    res.send(user);
});

router.get(`/get/count`, async (req, res) => {
    const userCount = await User.countDocuments((count) => count);

    if (!userCount) {
        res.status(500).json({ success: false });
    }
    res.send({ userCount: userCount });
});

router.delete(`/:id`, (req, res) => {
    User.findByIdAndRemove(req.params.id)
        .then((user) => {
            if (user) {
                return res
                    .status(200)
                    .json({ success: true, message: "the user is deleted!" });
            } else {
                return res
                    .status(404)
                    .json({ success: false, message: "user not found" });
            }
        })
        .catch((err) => {
            return res.status(400).json({ success: false, error: err });
        });
});

module.exports = router;
