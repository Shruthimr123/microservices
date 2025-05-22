import { Module } from '@nestjs/common';
import { UserService } from './user.service'
import { MongooseModule } from '@nestjs/mongoose'
import { UserController } from './user.controller';
import { UserSchema, User } from './schemas/user.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => ({
                 uri: config.get<string>('MONGO_URI')
                // uri: "mongodb+srv://shruthimr2003:FHEtfV8ZXZNrAaKF@cluster0.pee1bja.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

            })
        }),
        MongooseModule.forFeature([{
            name: User.name,
            schema: UserSchema
        }])
    ],

    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UsersModule { }