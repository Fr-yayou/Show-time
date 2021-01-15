"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConcertsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ConcertsService = class ConcertsService {
    constructor(concertModel) {
        this.concertModel = concertModel;
    }
    async insertConcert(name_concert, name_group, date, genre, max_tickets) {
        const newConcert = new this.concertModel({
            name_concert: name_concert,
            name_group: name_group,
            date: date,
            genre: genre,
            max_tickets: max_tickets
        });
        const result = await newConcert.save();
        return result.id;
    }
    async getConcerts() {
        const concerts = await this.concertModel.find().exec();
        return concerts.map(concert => ({
            id: concert.id,
            name_concert: concert.name_concert,
            name_group: concert.name_group,
            date: concert.date,
            genre: concert.genre,
            max_tickets: concert.max_tickets,
        }));
    }
    async getSingleConcert(concertId) {
        const concert = await this.findConcert(concertId);
        return {
            id: concert.id,
            name_concert: concert.name_concert,
            name_group: concert.name_group,
            date: concert.date,
            genre: concert.genre,
            max_tickets: concert.max_tickets,
        };
    }
    async deleteConcert(concertId) {
        const result = await this.concertModel.deleteOne({ _id: concertId }).exec();
        if (result.n === 0) {
            throw new common_1.NotFoundException('Could not find concert.');
        }
    }
    async updateConcert(concertId, name_concert, name_group, date, genre, max_tickets) {
        const updateConcert = await this.findConcert(concertId);
        if (name_concert) {
            updateConcert.name_concert = name_concert;
        }
        if (name_group) {
            updateConcert.name_group = name_group;
        }
        if (date) {
            updateConcert.date = date;
        }
        if (genre) {
            updateConcert.genre = genre;
        }
        if (max_tickets) {
            updateConcert.max_tickets = max_tickets;
        }
        updateConcert.save();
    }
    async findConcert(id) {
        let concert;
        try {
            concert = await this.concertModel.findById(id).exec();
        }
        catch (error) {
            throw new common_1.NotFoundException('Could not find concert.');
        }
        if (!concert) {
            throw new common_1.NotFoundException('Could not find concert.');
        }
        return concert;
    }
};
ConcertsService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Concert')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ConcertsService);
exports.ConcertsService = ConcertsService;
//# sourceMappingURL=concerts.service.js.map