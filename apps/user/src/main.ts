// import { NestFactory } from '@nestjs/core';
// import { UsersModule } from './user.module';
// import { MicroserviceOptions, Transport } from "@nestjs/microservices"

// async function bootstrap() {
//   const app = await NestFactory.createMicroservice(UsersModule,
//     {
//       transport: Transport.TCP,
//       options: {
//         host: "127.0.0.1",
//         port: 3001
//       }
//     })

//   app.enableCors({
//     origin: '*',
//     credential: true
//   })

//   await app.listen()
//   console.log("User micro service listening on port 3001")
// }
// bootstrap();

import { NestFactory } from '@nestjs/core';
import { UsersModule } from './user.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {

  //HTTP communication b/w postman and User
  //this is the http layer
  const app = await NestFactory.create(UsersModule);

  //adding ConfigService as a middleware for .env files/configuration
  const config = app.get(ConfigService)

  //registering the port number for User http
  const port = config.get<number>('USER_PORT')

  //TCP communication(Interservice) and registering tcp microservice
  //setting the port no for TCP communication for other service to communicate to Product
  const tcpPort = config.get<number>("USER_TCP_PORT")

  //register TCP microservice
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: config.get<string>('USER_TCP_HOST'),
      port: tcpPort
    }
  })

  app.enableCors({
    origin: '*',
    credential: true
  })
  //start tcp microservice
  await app.startAllMicroservices()

  //start http server for image upload , CRUD operations etc
  await app.listen(port || 3001)

} bootstrap()