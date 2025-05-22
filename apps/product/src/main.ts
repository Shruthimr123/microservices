// import { NestFactory } from '@nestjs/core';
// import { ProductsModule } from './products.module';
// import { ConfigModule } from '@nestjs/config';

// async function bootstrap() {
//   const app = await NestFactory.create(ProductsModule);
//   await app.listen(3001);
//   console.log('Product service HTTP server running on port 3001');
// }
// bootstrap();

import { NestFactory } from '@nestjs/core';
import { ProductsModule } from './products.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {

  //HTTP communication b/w postman and product
  //this is the http layer
  const app = await NestFactory.create(ProductsModule);

  //adding ConfigService as a middleware for .env files/configuration
  const config = app.get(ConfigService)

  //registering the port number for product http
  const port = config.get<number>('PRODUCT_PORT')

  //TCP communication(Interservice) and registering tcp microservice
  //setting the port no for TCP communication for other service to communicate to Product
  const tcpPort = config.get<number>("PRODUCT_TCP_PORT")

  //register TCP microservice
  app.connectMicroservice<MicroserviceOptions>({
    transport:Transport.TCP,
    options:{
      host:config.get<string>('PRODUCT_TCP_HOST'),
      port:tcpPort
    }
  })

  //start tcp microservice
  await app.startAllMicroservices()

  //start http server for image upload , CRUD operations etc
  await app.listen(port||3001)





} bootstrap()