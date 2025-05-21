
export class CreateProductDto {
  name: string;
  category: string;
  price: number;
  quantity: number;
  description?: string;
  imageUrl?: string;

}
