import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, userDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { RegisterDto } from 'apps/auth/src/dto/register.dto';


@Injectable()
export class UserService {
 constructor(@InjectModel(User.name) private userModel:Model<userDocument>){
 }

 async findByEmail(email:string):Promise<User |null>{
    return this.userModel.findOne({ email: email })
 }

 async create(data:Partial<User>):Promise<User>{
   const newUser=new this.userModel(data)
   return newUser.save()
 }

 async updateById(id: string, updateData: Partial<User>): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteById(id: string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(id);
  }

  async deleteAll(): Promise<{ deletedCount?: number }> {
    return this.userModel.deleteMany({});
  }

  async findById(id: string): Promise<User | null> {
  return this.userModel.findById(id).exec();
}

}
