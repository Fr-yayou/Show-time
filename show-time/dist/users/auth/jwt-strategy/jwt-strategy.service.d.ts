import { Strategy } from "passport-jwt";
import { UsersService } from 'src/users/services/users.service';
declare const JwtStrategyService_base: new (...args: any[]) => Strategy;
export declare class JwtStrategyService extends JwtStrategyService_base {
    private userService;
    constructor(userService: UsersService);
    validate(payload: any): Promise<{
        userId: any;
        email: any;
        isAdmin: any;
        username: any;
    }>;
}
export {};
