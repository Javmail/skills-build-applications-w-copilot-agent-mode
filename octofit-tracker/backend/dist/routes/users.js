"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("../models/user"));
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    try {
        const users = await user_1.default.find().populate('team');
        res.json({ message: 'Users endpoint', data: users });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to load users', error });
    }
});
router.post('/', async (req, res) => {
    try {
        const user = await user_1.default.create(req.body);
        res.status(201).json({ message: 'Create user endpoint', user });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to create user', error });
    }
});
exports.default = router;
