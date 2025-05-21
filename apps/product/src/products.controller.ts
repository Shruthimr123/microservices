import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
@MessagePattern({ cmd: 'create-product' })
createProduct(@Payload() data: { productDto: CreateProductDto & { imageUrl?: string } }) {
  const { productDto } = data;
  return this.productsService.addProduct(productDto);
}

  @MessagePattern({ cmd: 'get-all-products' })
  findAll() {
    return this.productsService.findAll();
  }

  @MessagePattern({ cmd: 'get-product' })
  findOne(@Payload() id: string) {
    return this.productsService.findOne(id);
  }

  @MessagePattern({ cmd: 'update-product' })
  update(@Payload() data: { id: string, updateDto: UpdateProductDto }) {
    return this.productsService.update(data.id, data.updateDto);
  }

  @MessagePattern({ cmd: 'delete-product' })
  remove(@Payload() id: string) {
    return this.productsService.remove(id);
  }
}
