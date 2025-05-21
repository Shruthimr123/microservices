import { NestFactory } from '@nestjs/core';
import { UsersModule } from './user.module';
import { MicroserviceOptions, Transport } from "@nestjs/microservices"

async function bootstrap() {
  const app = await NestFactory.createMicroservice(UsersModule,
    {
      transport: Transport.TCP,
      options: {
        host: "127.0.0.1",
        port: 3001
      }
    })
    await app.listen()
    console.log("User micro service listening on port 3001")
}
bootstrap();