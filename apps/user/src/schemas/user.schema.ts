import {Prop, Schema, SchemaFactory}from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type userDocument= User & Document 
@Schema({timestamps:true})

export class User{
    @Prop ({required : true})
    name:string

    @Prop ({required : true})
    username:string

    @Prop ({required : true, unique:true})
    email:string

    @Prop ({required : true})
    password:string

    @Prop ({required : true, unique:true})
    phone:number

    @Prop({default : 'customer'})
    role: 'customer' | 'admin'
}

export const UserSchema= SchemaFactory.createForClass(User);