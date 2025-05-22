import { Controller, Post, UseInterceptors, UploadedFile, Body, UseGuards, Get, Param, Put, Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';
import { multerConfig } from './multer.config';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'apps/utilitis/guards/roles.guard';
import { Roles } from 'apps/utilitis/decorators/roles.decorators';
import { UpdateProductDto } from './dto/update-product.dto';

//We are using the Controller Decorator to control services of the application
@Controller('products')
export class ProductsController {
  // we are injecting ProductService as a dependency to productController Class via loose coupling
  // setter, getters and binding is done by @Controller (Nest.js is taking care of it)
  constructor(private readonly productsService: ProductsService) { }

  //we are having post request with url parameter
  //we are using  @UseInterceptors for intercepting file operations using FileInterceptor
  //with image and getting file extensions back. 
  // creating the product with CreateProductDto as the TYpe and upload fike using Express>Multer.File
  @Post()
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async createProduct(
    @Body() dto: CreateProductDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    const imageUrl = file ? file.path : undefined;
    return this.productsService.create({ ...dto, imageUrl });
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'customer')
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @Roles('admin', 'customer')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @Roles('admin')
  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }

}
