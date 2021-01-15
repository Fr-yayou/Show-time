"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConcertSchema = void 0;
const mongoose = require("mongoose");
exports.ConcertSchema = new mongoose.Schema({
    name_concert: { type: String, required: true },
    name_group: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Group",
            required: true
        }],
    date: { type: String, required: true },
    genre: { type: Array, required: true },
    max_tickets: { type: Number, required: true },
});
//# sourceMappingURL=concert.schema.js.map