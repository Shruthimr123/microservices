import { ClientsModule } from "@nestjs/microservices";
import { Transport } from "@nestjs/microservices";

ClientsModule.register([
  {
    name: 'PRODUCT_SERVICE',
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: 3002,
    },
  },
])
