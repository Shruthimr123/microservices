import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './schemas/category.schema';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category.name) private categoryModel: Model<CategoryDocument>) {}

  async createIfNotExists(name: string): Promise<Category> {
    let category = await this.categoryModel.findOne({ name });
    if (!category) {
      category = new this.categoryModel({ name });
      await category.save();
    }
    return category;
  }
}
