"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const workoutSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, required: true, enum: ['Beginner', 'Intermediate', 'Advanced'] },
    durationMinutes: { type: Number, required: true },
    scheduledFor: { type: Date, required: true },
    completed: { type: Boolean, default: false }
});
const Workout = (0, mongoose_1.model)('Workout', workoutSchema);
exports.default = Workout;
