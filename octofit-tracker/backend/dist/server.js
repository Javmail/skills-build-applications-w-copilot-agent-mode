"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const users_1 = __importDefault(require("./routes/users"));
const teams_1 = __importDefault(require("./routes/teams"));
const activities_1 = __importDefault(require("./routes/activities"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const workouts_1 = __importDefault(require("./routes/workouts"));
const app = (0, express_1.default)();
const PORT = 8000;
const HOST = process.env.CODESPACE_NAME ? '0.0.0.0' : 'localhost';
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const API_URL = process.env.CODESPACE_NAME
    ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
    : `http://${HOST}:${PORT}`;
app.use((0, cors_1.default)({ origin: true }));
app.use(express_1.default.json());
app.use('/api/users', users_1.default);
app.use('/api/teams', teams_1.default);
app.use('/api/activities', activities_1.default);
app.use('/api/leaderboard', leaderboard_1.default);
app.use('/api/workouts', workouts_1.default);
app.get('/', (req, res) => {
    res.json({ message: 'OctoFit Tracker API is running', apiUrl: API_URL });
});
app.listen(PORT, HOST, async () => {
    try {
        await mongoose_1.default.connect(MONGO_URI);
        console.log(`MongoDB connected at ${MONGO_URI}`);
    }
    catch (error) {
        console.error('MongoDB connection error:', error);
    }
    console.log(`Backend running on ${API_URL}`);
});
