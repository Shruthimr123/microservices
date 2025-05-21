// Anything that comes from NestJS (like @Injectable) is a decorator
import { Injectable } from "@nestjs/common"; // Marks the class as available for NestJS's dependency injection system
import { PassportStrategy } from "@nestjs/passport"; // Integrates Passport.js strategies into NestJS
import { ExtractJwt, Strategy } from "passport-jwt"; // Used for handling JWT extraction and validation
import { ConfigService } from "@nestjs/config";  // Helps access environment variables (e.g., secret keys)

@Injectable()
export class JwtStratergy extends PassportStrategy(Strategy) {

    
    constructor(configService: ConfigService) {
       
        const secret_key = configService.get<string>('JWT_SECRET')
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: secret_key || 'fallback_secret' 
        })
    }
    
    async validate(payload: any) {
        return { email: payload.email, role: payload.role }
    }
}