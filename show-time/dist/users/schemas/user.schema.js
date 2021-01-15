"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose = require("mongoose");
exports.UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, minimum: 2 },
    email: { type: String, required: true, unique: true, minimum: 6 },
    password: { type: String, required: true, unique: false },
    isAdmin: { type: String, default: 0, nullable: true },
    booked_concert: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Concert"
        }
    ],
    whished_concert: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Concert"
        }
    ],
    favorite_band: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Group"
        }
    ]
});
//# sourceMappingURL=user.schema.js.map