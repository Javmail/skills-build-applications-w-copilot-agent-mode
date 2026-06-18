"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const leaderboardSchema = new mongoose_1.Schema({
    entityRef: { type: mongoose_1.Schema.Types.ObjectId, required: true, refPath: 'entityType' },
    entityType: { type: String, required: true, enum: ['User', 'Team'] },
    rank: { type: Number, required: true },
    score: { type: Number, required: true },
    category: { type: String, required: true },
    updatedAt: { type: Date, default: () => new Date() }
});
const Leaderboard = (0, mongoose_1.model)('Leaderboard', leaderboardSchema);
exports.default = Leaderboard;
