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
exports.ConcertsController = void 0;
const common_1 = require("@nestjs/common");
const concerts_service_1 = require("./concerts.service");
let ConcertsController = class ConcertsController {
    constructor(concertsService) {
        this.concertsService = concertsService;
    }
    async addConcert(nameConcert, nameGroup, dateConcert, genreConcert, maxTickets) {
        const generatedId = await this.concertsService.insertConcert(nameConcert, nameGroup, dateConcert, genreConcert, maxTickets);
        return { id: generatedId };
    }
    async getAllConcerts() {
        const concerts = await this.concertsService.getConcerts();
        return concerts;
    }
    getConcert(concertId) {
        return this.concertsService.getSingleConcert(concertId);
    }
    async updateConcert(concertId, nameConcert, nameGroup, dateConcert, genreConcert, maxTickets) {
        await this.concertsService.updateConcert(concertId, nameConcert, nameGroup, dateConcert, genreConcert, maxTickets);
        return null;
    }
    async removeConcert(concertId) {
        await this.concertsService.deleteConcert(concertId);
        return null;
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body('name_concert')),
    __param(1, common_1.Body('name_group')),
    __param(2, common_1.Body('date')),
    __param(3, common_1.Body('genre')),
    __param(4, common_1.Body('max_tickets')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String, Object, Number]),
    __metadata("design:returntype", Promise)
], ConcertsController.prototype, "addConcert", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ConcertsController.prototype, "getAllConcerts", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ConcertsController.prototype, "getConcert", null);
__decorate([
    common_1.Patch(':id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body('name_concert')),
    __param(2, common_1.Body('name_group')),
    __param(3, common_1.Body('date')),
    __param(4, common_1.Body('genre')),
    __param(5, common_1.Body('max_tickets')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, String, Object, Number]),
    __metadata("design:returntype", Promise)
], ConcertsController.prototype, "updateConcert", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ConcertsController.prototype, "removeConcert", null);
ConcertsController = __decorate([
    common_1.Controller('concerts'),
    __metadata("design:paramtypes", [concerts_service_1.ConcertsService])
], ConcertsController);
exports.ConcertsController = ConcertsController;
//# sourceMappingURL=concerts.controller.js.map