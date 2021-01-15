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
exports.FeedbacksController = void 0;
const common_1 = require("@nestjs/common");
const feedbacks_service_1 = require("./feedbacks.service");
const create_feedback_dto_1 = require("./dto/create-feedback.dto");
let FeedbacksController = class FeedbacksController {
    constructor(feedbacksService) {
        this.feedbacksService = feedbacksService;
    }
    findAll() {
        return this.feedbacksService.findAll();
    }
    findOne(id) {
        return this.feedbacksService.findOne(id);
    }
    create(CreateFeedbackDto) {
        return this.feedbacksService.create(CreateFeedbackDto);
    }
    destroy(id) {
        return this.feedbacksService.delete(id);
    }
    ;
    update(updateFeedbackDto, id) {
        return this.feedbacksService.update(id, updateFeedbackDto);
    }
    ;
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FeedbacksController.prototype, "findAll", null);
__decorate([
    common_1.Get(":id"),
    __param(0, common_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FeedbacksController.prototype, "findOne", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_feedback_dto_1.CreateFeedbackDto]),
    __metadata("design:returntype", Promise)
], FeedbacksController.prototype, "create", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FeedbacksController.prototype, "destroy", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Body()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_feedback_dto_1.CreateFeedbackDto, Object]),
    __metadata("design:returntype", Promise)
], FeedbacksController.prototype, "update", null);
FeedbacksController = __decorate([
    common_1.Controller('feedbacks'),
    __metadata("design:paramtypes", [feedbacks_service_1.FeedbacksService])
], FeedbacksController);
exports.FeedbacksController = FeedbacksController;
//# sourceMappingURL=feedbacks.controller.js.map