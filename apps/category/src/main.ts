import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { CategoryModule } from './category.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(CategoryModule, {
    
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: 3002,
    },
  });
  await app.listen();
  console.log('Category microservice is listening on TCP port 3002');
}
bootstrap();




// import { NestFactory } from '@nestjs/core';
// import { ConfigService } from '@nestjs/config';
// import { MicroserviceOptions, Transport } from '@nestjs/microservices';
// import { CategoryModule } from './category.module';

// async function bootstrap() {

//   //HTTP communication b/w postman and product
//   //this is the http layer
//   const app = await NestFactory.create(CategoryModule);

//   //adding ConfigService as a middleware for .env files/configuration
//   const config = app.get(ConfigService)


//   //registering the port number for category http
//   const port = config.get<number>('CATEGORY_PORT')

//   //TCP communication(Interservice) and registering tcp microservice
//   //setting the port no for TCP communication for other service to communicate to Product
//   const tcpPort = config.get<number>("CATEGORY_TCP_PORT")

//   //register TCP microservice
//   app.connectMicroservice<MicroserviceOptions>({
//     transport:Transport.TCP,
//     options:{
//       host:config.get<string>('CATEGORY_TCP_HOST'),
//       port:tcpPort
//     }
//   })

//   //start tcp microservice
//   await app.startAllMicroservices()

//   //start http server for image upload , CRUD operations etc
//   await app.listen(port||3002)





// } bootstrap()