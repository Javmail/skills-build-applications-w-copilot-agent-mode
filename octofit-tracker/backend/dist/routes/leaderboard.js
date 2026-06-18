"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const leaderboard_1 = __importDefault(require("../models/leaderboard"));
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    try {
        const leaderboard = await leaderboard_1.default.find().populate('entityRef');
        res.json({ message: 'Leaderboard endpoint', data: leaderboard });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to load leaderboard', error });
    }
});
exports.default = router;
