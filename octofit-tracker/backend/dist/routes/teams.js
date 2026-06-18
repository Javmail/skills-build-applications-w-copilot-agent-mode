"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const team_1 = __importDefault(require("../models/team"));
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    try {
        const teams = await team_1.default.find().populate('members');
        res.json({ message: 'Teams endpoint', data: teams });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to load teams', error });
    }
});
router.post('/', async (req, res) => {
    try {
        const team = await team_1.default.create(req.body);
        res.status(201).json({ message: 'Create team endpoint', team });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to create team', error });
    }
});
exports.default = router;
