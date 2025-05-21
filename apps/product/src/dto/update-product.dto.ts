import { PartialType } from '@nestjs/mapped-types';

import { CreateProductDto } from './create-product.dto';
export class UpdateProductDto extends PartialType(CreateProductDto) {
    name?: string;
    category?: string;
    price?: number;
    quantity?: number;
    description?: string;
    imageUrl?: string;
}
