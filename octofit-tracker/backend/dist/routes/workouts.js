"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const workout_1 = __importDefault(require("../models/workout"));
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    try {
        const workouts = await workout_1.default.find().populate('user');
        res.json({ message: 'Workouts endpoint', data: workouts });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to load workouts', error });
    }
});
router.post('/', async (req, res) => {
    try {
        const workout = await workout_1.default.create(req.body);
        res.status(201).json({ message: 'Create workout endpoint', workout });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to create workout', error });
    }
});
exports.default = router;
