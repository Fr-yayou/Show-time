import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UsersService } from "../../services/users.service";
export declare class RolesGuard implements CanActivate {
    private reflector;
    private userService;
    constructor(reflector: Reflector, userService: UsersService);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
