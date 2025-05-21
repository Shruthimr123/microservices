import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';


@Injectable()
export class ProductClientService {
  constructor(@Inject('PRODUCT_SERVICE') private readonly productClient: ClientProxy) {}

  async createProduct(dto, file) {
    return firstValueFrom(this.productClient.send({ cmd: 'create-product' }, { productDto: dto, file }));
  }

  async getAllProducts() {
    return firstValueFrom(this.productClient.send({ cmd: 'get-all-products' }, {}));
  }

  async getProduct(id: string) {
    return firstValueFrom(this.productClient.send({ cmd: 'get-product' }, id));
  }

  async updateProduct(id: string, dto) {
    return firstValueFrom(this.productClient.send({ cmd: 'update-product' }, { id, updateDto: dto }));
  }

  async deleteProduct(id: string) {
    return firstValueFrom(this.productClient.send({ cmd: 'delete-product' }, id));
  }
}
