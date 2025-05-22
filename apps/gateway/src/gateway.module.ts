import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { AuthModule } from 'apps/auth/src/auth.module';
import { JwtStrategy } from 'apps/auth/src/strategies/jwt.strategy';

@Module({
  imports: [],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}