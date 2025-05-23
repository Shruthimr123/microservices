// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { ProductsController } from './products.controller';
// import { ProductsService } from './products.service';
// import { Product, ProductSchema } from './schemas/products.schema';
// import { ClientsModule, Transport } from '@nestjs/microservices';
// import { ConfigModule, ConfigService } from '@nestjs/config';

// @Module({
//   imports: [
//     ConfigModule.forRoot({ isGlobal: true }),

//     MongooseModule.forRootAsync({
//       imports: [ConfigModule],
//       inject: [ConfigService],
//       useFactory: (configService: ConfigService) => ({
//         uri: configService.get<string>('MONGO_URI'),
//       }),
//     }),

//     MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),

//     ClientsModule.registerAsync([
//       {
//         name: 'CATEGORY_SERVICE',
//         imports: [ConfigModule],
//         inject: [ConfigService],
//         useFactory: (configService: ConfigService) => ({
//           transport: Transport.TCP,
//           options: {
//             host: configService.get<string>('CATEGORY_SERVICE_HOST'),
//             port: configService.get<number>('CATEGORY_SERVICE_PORT'),
//           },
//         }),
//       },
//     ]),
//   ],
//   controllers: [ProductsController],
//   providers: [ProductsService],
// })
// export class ProductsModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product, ProductSchema } from './schemas/products.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from 'apps/auth/src/strategies/jwt-auth.guard';
import { RolesGuard } from 'apps/utilitis/guards/roles.guard';
import { AuthModule } from 'apps/auth/src/auth.module';

@Module({
  imports: [
    AuthModule,
    // Load environment variables globally
    ConfigModule.forRoot({
       isGlobal: true,
       envFilePath:'apps/product/.env'

     }),

    // Connect to MongoDB
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
    }),

    // Register Product schema
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),

    // TCP client for Category microservice
    ClientsModule.registerAsync([
      {
        name: 'CATEGORY_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
          const host = configService.get<string>('CATEGORY_SERVICE_HOST');
          const port = configService.get<number>('CATEGORY_SERVICE_PORT');

          // Log for debugging purposes
          console.log('Connecting to Category microservice at:', host, port);

          return {
            transport: Transport.TCP,
            options: {
              host: host,
              port: port,
            },
          };

        },
      },
    ]),
  ],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    RolesGuard,
    JwtAuthGuard,

  ],
})
export class ProductsModule { }

