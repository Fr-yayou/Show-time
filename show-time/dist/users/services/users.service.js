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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const password_hasher_service_1 = require("../auth/password-hasher/password-hasher.service");
const jwt_1 = require("@nestjs/jwt");
let UsersService = class UsersService {
    constructor(userModel, hasherService, jwtService) {
        this.userModel = userModel;
        this.hasherService = hasherService;
        this.jwtService = jwtService;
    }
    async signup(doc) {
        const userEmail = await this.userModel.findOne({ email: doc.email });
        if (userEmail) {
            throw new common_1.UnauthorizedException(`User already register with this email: ${doc.email}`);
        }
        const userName = await this.userModel.findOne({ username: doc.username });
        if (userName) {
            throw new common_1.UnauthorizedException(`User already register with this username: ${doc.username}`);
        }
        const encryptedPassword = await this.hasherService.hashPassword(doc.password);
        const newUser = new this.userModel({ username: doc.username, email: doc.email, password: encryptedPassword });
        await newUser.save();
        return { email: newUser.email };
    }
    async login(doc) {
        const user = await this.userModel.findOne({ email: doc.email });
        if (!user)
            throw new common_1.UnauthorizedException(`Could not found any user with this email ${doc.email}`);
        const matchedPassword = await this.hasherService.comparePassword(doc.password, user.password);
        if (matchedPassword) {
            const token = await this.jwtService.signAsync({ email: user.email, id: user._id, isAdmin: user.isAdmin, username: user.username }, { expiresIn: "1d" });
            return { token };
        }
        else {
            throw new common_1.UnauthorizedException(`Invalid password`);
        }
    }
    async findAll() {
        return await this.userModel.find();
    }
    ;
    async validateUserById(userId) {
        const user = await this.userModel.findById(userId);
        if (user) {
            return true;
        }
        else {
            return false;
        }
    }
    async findOne(id) {
        return await this.userModel.findOne({ _id: id });
    }
    ;
    async delete(id) {
        return await this.userModel.findByIdAndRemove(id);
    }
    ;
    async update(id, user) {
        return await this.userModel.findByIdAndUpdate(id, user, { new: true });
    }
    ;
    async create(user) {
        const newUser = new this.userModel(user);
        return await newUser.save();
    }
    ;
};
UsersService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel("User")),
    __metadata("design:paramtypes", [mongoose_1.Model,
        password_hasher_service_1.PasswordHasherService,
        jwt_1.JwtService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map