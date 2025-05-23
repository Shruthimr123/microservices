// import { NestFactory } from '@nestjs/core';
// import { AuthModule } from './auth.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AuthModule);
//   //allow all origins to connect
//   app.enableCors({
//     origin: '*',
//     credential: true
//   })
//   await app.listen(process.env.PORT ?? 3000);
// }
// bootstrap();


import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {

  //HTTP communication b/w postman and User
  //this is the http layer
  const app = await NestFactory.create(AuthModule);

  //adding ConfigService as a middleware for .env files/configuration
  const config = app.get(ConfigService)

  //registering the port number for User http
  const port = config.get<number>('PORT')

  //TCP communication(Interservice) and registering tcp microservice
  //setting the port no for TCP communication for other service to communicate to Product
  const tcpPort = config.get<number>("AUTH_TCP_PORT")

  //register TCP microservice
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: config.get<string>('AUTH_TCP_HOST'),
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
  await app.listen(port || 3000)

} bootstrap()