import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

//we are combining union types of product and document using mongo urm
export type ProductDocument = Product & Document;

//Creating Schema using Schema Decorator and asking Schema to have an option of timestamp
@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  quantity: number;

  @Prop()
  description?: string;

  @Prop()
  imageUrl?: string;
}
//class being forwarded as collection to mongodb through mongoose as mongoose shema

export const ProductSchema = SchemaFactory.createForClass(Product);
