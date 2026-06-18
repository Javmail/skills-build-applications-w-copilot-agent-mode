"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const activity_1 = __importDefault(require("../models/activity"));
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    try {
        const activities = await activity_1.default.find().populate('user team');
        res.json({ message: 'Activities endpoint', data: activities });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to load activities', error });
    }
});
router.post('/', async (req, res) => {
    try {
        const activity = await activity_1.default.create(req.body);
        res.status(201).json({ message: 'Log activity endpoint', activity });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to log activity', error });
    }
});
exports.default = router;
