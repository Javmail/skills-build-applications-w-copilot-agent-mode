"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("../models/user"));
const team_1 = __importDefault(require("../models/team"));
const activity_1 = __importDefault(require("../models/activity"));
const workout_1 = __importDefault(require("../models/workout"));
const leaderboard_1 = __importDefault(require("../models/leaderboard"));
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
async function seed() {
    console.log('Seed the octofit_db database with test data');
    await mongoose_1.default.connect(MONGO_URI);
    console.log(`Connected to MongoDB at ${MONGO_URI}`);
    await Promise.all([
        user_1.default.deleteMany({}),
        team_1.default.deleteMany({}),
        activity_1.default.deleteMany({}),
        workout_1.default.deleteMany({}),
        leaderboard_1.default.deleteMany({})
    ]);
    const teams = await team_1.default.create([
        {
            name: 'Coral Crushers',
            description: 'A motivated crew focused on endurance and team challenges',
            members: []
        },
        {
            name: 'Tide Riders',
            description: 'Strength and speed training for friendly leaderboard dominance',
            members: []
        }
    ]);
    const users = await user_1.default.create([
        {
            name: 'Avery Harper',
            email: 'avery.harper@example.com',
            role: 'member',
            team: teams[0]._id,
            metrics: { totalDistanceKm: 42.7, totalHours: 16.5, totalWorkouts: 22 }
        },
        {
            name: 'Nina Brooks',
            email: 'nina.brooks@example.com',
            role: 'coach',
            team: teams[0]._id,
            metrics: { totalDistanceKm: 61.2, totalHours: 24.3, totalWorkouts: 34 }
        },
        {
            name: 'Jordan Kim',
            email: 'jordan.kim@example.com',
            role: 'member',
            team: teams[1]._id,
            metrics: { totalDistanceKm: 33.4, totalHours: 12.8, totalWorkouts: 18 }
        },
        {
            name: 'Maya Patel',
            email: 'maya.patel@example.com',
            role: 'member',
            team: teams[1]._id,
            metrics: { totalDistanceKm: 48.1, totalHours: 20.0, totalWorkouts: 27 }
        }
    ]);
    teams[0].members = [users[0]._id, users[1]._id];
    teams[1].members = [users[2]._id, users[3]._id];
    await Promise.all([teams[0].save(), teams[1].save()]);
    const activities = await activity_1.default.create([
        {
            user: users[0]._id,
            team: teams[0]._id,
            type: 'Trail Run',
            durationMinutes: 55,
            distanceKm: 10.2,
            calories: 760,
            date: new Date('2026-06-12T07:30:00Z'),
            notes: 'Strong pace and smooth climb through the coastal trail.'
        },
        {
            user: users[1]._id,
            team: teams[0]._id,
            type: 'Interval Training',
            durationMinutes: 40,
            distanceKm: 8,
            calories: 620,
            date: new Date('2026-06-13T18:00:00Z'),
            notes: 'Coach session focused on speed intervals and recovery.'
        },
        {
            user: users[2]._id,
            team: teams[1]._id,
            type: 'Deck Strength',
            durationMinutes: 50,
            distanceKm: 0,
            calories: 540,
            date: new Date('2026-06-14T06:45:00Z'),
            notes: 'Upper body strength session with rowing and push-ups.'
        },
        {
            user: users[3]._id,
            team: teams[1]._id,
            type: 'Open Water Swim',
            durationMinutes: 35,
            distanceKm: 2.5,
            calories: 420,
            date: new Date('2026-06-15T08:00:00Z'),
            notes: 'Smooth stroke cadence and strong finish in the bay.'
        }
    ]);
    const workouts = await workout_1.default.create([
        {
            user: users[0]._id,
            title: 'Sunrise Recovery Ride',
            description: 'Easy spin to loosen the legs after a trail run.',
            difficulty: 'Beginner',
            durationMinutes: 30,
            scheduledFor: new Date('2026-06-16T06:00:00Z'),
            completed: false
        },
        {
            user: users[1]._id,
            title: 'Power Sprint Blocks',
            description: 'Short sprints with full recovery for speed gains.',
            difficulty: 'Advanced',
            durationMinutes: 45,
            scheduledFor: new Date('2026-06-16T18:00:00Z'),
            completed: false
        },
        {
            user: users[2]._id,
            title: 'Core and Mobility',
            description: 'Stability work with focus on mobility and posture.',
            difficulty: 'Intermediate',
            durationMinutes: 35,
            scheduledFor: new Date('2026-06-17T07:15:00Z'),
            completed: false
        }
    ]);
    await leaderboard_1.default.create([
        {
            entityRef: users[0]._id,
            entityType: 'User',
            rank: 1,
            score: 1850,
            category: 'Weekly Performance'
        },
        {
            entityRef: users[3]._id,
            entityType: 'User',
            rank: 2,
            score: 1720,
            category: 'Weekly Performance'
        },
        {
            entityRef: teams[0]._id,
            entityType: 'Team',
            rank: 1,
            score: 3570,
            category: 'Team Challenge'
        }
    ]);
    console.log('Seed data inserted successfully');
    await mongoose_1.default.disconnect();
}
seed().catch(error => {
    console.error('Seed script failed:', error);
    process.exit(1);
});
