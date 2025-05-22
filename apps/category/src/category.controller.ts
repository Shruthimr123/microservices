import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CategoryService } from './category.service';
import { RpcException } from '@nestjs/microservices';

@Controller()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // @MessagePattern({ cmd: 'create-category' })
  // async handleCategoryCreate(data: { name: string }) {
  //   return this.categoryService.createIfNotExists(data.name);
  // }
  @MessagePattern({cmd :'create-category'})
async handleCreateCategory(data: {name : string}) {
  try {
    return this.categoryService.createIfNotExists(data.name);
  } catch (error) {
    console.error('Error in Category microservice:', error);
    throw new RpcException('Failed to create category');
  }
}
}
