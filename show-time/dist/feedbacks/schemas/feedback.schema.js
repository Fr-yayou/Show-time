"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackSchema = void 0;
const mongoose = require("mongoose");
exports.FeedbackSchema = new mongoose.Schema({
    feedback: String,
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    concert_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Concert",
        required: true
    }
});
//# sourceMappingURL=feedback.schema.js.map