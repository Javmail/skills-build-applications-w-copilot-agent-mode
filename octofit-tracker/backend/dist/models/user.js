"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true, enum: ['member', 'coach'], default: 'member' },
    team: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Team' },
    metrics: {
        totalDistanceKm: { type: Number, default: 0 },
        totalHours: { type: Number, default: 0 },
        totalWorkouts: { type: Number, default: 0 }
    },
    createdAt: { type: Date, default: () => new Date() }
});
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
