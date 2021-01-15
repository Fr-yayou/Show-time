import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from "passport-jwt"
import { UsersService } from 'src/users/services/users.service';

@Injectable()
// first thing we need to extend it from the passport strategy//
export class JwtStrategyService extends PassportStrategy(Strategy) {

    constructor(
        private userService: UsersService
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey:process.env.JWT_SECRET
        });
    }

    async validate(payload:any){
        //find user id from the payload//
        const isValidated = await this.userService.validateUserById(payload.id);
        if(isValidated){
            return {userId:payload.id, email:payload.email,isAdmin:payload.isAdmin,username:payload.username}
        }else{
            throw new UnauthorizedException("Unauthorized")
        }
    }
}
