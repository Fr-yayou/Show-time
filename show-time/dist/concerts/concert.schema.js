"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConcertSchema = void 0;
const mongoose = require("mongoose");
exports.ConcertSchema = new mongoose.Schema({
    name_concert: String,
    name_group: String,
    date: String,
    genre: String,
    max_tickets: Number
});
//# sourceMappingURL=concert.schema.js.map